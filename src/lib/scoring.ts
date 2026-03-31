// Hana 採点ロジック v3
// 5軸 + 業種適性スコア、[5,3,1,0] スコアリング
import { questions, type Question, type Axis } from './questions';

export interface Scores {
  agreeableness: number;
  conscientiousness: number;
  adaptability: number;
  proactivity: number;
  stressTolerance: number;
}

export interface ConsistencyResult {
  overall: number; // 0-100 (高い = 一貫性あり)
  flaggedAxes: Axis[]; // ばらつきが大きい軸
}

export interface TestResult {
  id: string;
  candidateName: string;
  companyCode: string;
  language: string;
  answers: Record<number, number>; // questionId -> choiceIndex (0-3)
  scores: Scores;
  industryScore: number; // 業種適性スコア (0-100)
  consistency: ConsistencyResult; // 回答一貫性
  completedAt: string;
}

// v3: [5, 3, 1, 0] でコントラスト強化
const SCORE_MAP = [5, 3, 1, 0];

function getScore(choiceIndex: number): number {
  return SCORE_MAP[choiceIndex] ?? 0;
}

/** ベース15問のスコア計算 */
export function calculateScores(answers: Record<number, number>): Scores {
  const axisTotals: Record<Axis, number> = {
    agreeableness: 0,
    conscientiousness: 0,
    adaptability: 0,
    proactivity: 0,
    stressTolerance: 0,
  };

  const axisCounts: Record<Axis, number> = {
    agreeableness: 0,
    conscientiousness: 0,
    adaptability: 0,
    proactivity: 0,
    stressTolerance: 0,
  };

  for (const q of questions) {
    const choiceIndex = answers[q.id];
    if (choiceIndex === undefined) continue;

    axisTotals[q.axis] += getScore(choiceIndex);
    axisCounts[q.axis]++;
  }

  // 各軸: 3問 × 最大5点 = 15点満点 → 100点換算
  const toPercent = (axis: Axis) => {
    if (axisCounts[axis] === 0) return 0;
    const max = axisCounts[axis] * 5;
    return Math.round((axisTotals[axis] / max) * 100);
  };

  return {
    agreeableness: toPercent('agreeableness'),
    conscientiousness: toPercent('conscientiousness'),
    adaptability: toPercent('adaptability'),
    proactivity: toPercent('proactivity'),
    stressTolerance: toPercent('stressTolerance'),
  };
}

/** 業種別5問のスコア計算 (Q16-Q20) */
export function calculateIndustryScore(answers: Record<number, number>): number {
  let total = 0;
  let count = 0;
  for (let qId = 16; qId <= 20; qId++) {
    const choiceIndex = answers[qId];
    if (choiceIndex === undefined) continue;
    total += getScore(choiceIndex);
    count++;
  }
  if (count === 0) return 0;
  return Math.round((total / (count * 5)) * 100);
}

export function getJudgment(scores: Scores): 'A' | 'B' | 'C' | 'D' {
  const avg = (scores.agreeableness + scores.conscientiousness +
    scores.adaptability + scores.proactivity + scores.stressTolerance) / 5;

  // 誠実性・ストレス耐性が低い場合は要注意
  if (scores.conscientiousness < 35 || scores.stressTolerance < 30) return 'D';
  if (avg < 40) return 'D';

  if (scores.conscientiousness < 50 || scores.adaptability < 45) return 'C';
  if (avg < 55) return 'C';

  if (avg >= 75 && scores.conscientiousness >= 70 && scores.stressTolerance >= 60) return 'A';
  if (avg >= 60) return 'B';

  return 'C';
}

/** 強み・弱みの抽出 */
export function getStrengthsAndWeaknesses(scores: Scores): {
  strengths: Axis[];
  weaknesses: Axis[];
} {
  const axes: { axis: Axis; score: number }[] = [
    { axis: 'agreeableness', score: scores.agreeableness },
    { axis: 'conscientiousness', score: scores.conscientiousness },
    { axis: 'adaptability', score: scores.adaptability },
    { axis: 'proactivity', score: scores.proactivity },
    { axis: 'stressTolerance', score: scores.stressTolerance },
  ];

  const sorted = [...axes].sort((a, b) => b.score - a.score);
  const avg = axes.reduce((s, a) => s + a.score, 0) / axes.length;

  // 平均より15ポイント以上高い = 強み、15ポイント以上低い = 弱み
  const strengths = sorted.filter(a => a.score >= avg + 15).map(a => a.axis);
  const weaknesses = sorted.filter(a => a.score <= avg - 15).map(a => a.axis);

  // 最低1つは表示（差が小さくても上位/下位1つ）
  if (strengths.length === 0 && sorted[0].score > sorted[sorted.length - 1].score) {
    strengths.push(sorted[0].axis);
  }
  if (weaknesses.length === 0 && sorted[sorted.length - 1].score < sorted[0].score) {
    weaknesses.push(sorted[sorted.length - 1].axis);
  }

  return { strengths, weaknesses };
}

/**
 * 回答の一貫性チェック
 * 同じ軸の3問の回答スコアのばらつき（標準偏差）を計算。
 * 例: 協調性の3問で [5, 5, 5] → 完全一貫 / [5, 0, 5] → ばらつき大（不誠実の可能性）
 */
export function calculateConsistency(answers: Record<number, number>): ConsistencyResult {
  const axisScores: Record<Axis, number[]> = {
    agreeableness: [],
    conscientiousness: [],
    adaptability: [],
    proactivity: [],
    stressTolerance: [],
  };

  for (const q of questions) {
    const choiceIndex = answers[q.id];
    if (choiceIndex === undefined) continue;
    axisScores[q.axis].push(getScore(choiceIndex));
  }

  const flaggedAxes: Axis[] = [];
  const axisConsistencies: number[] = [];

  for (const [axis, scores] of Object.entries(axisScores) as [Axis, number[]][]) {
    if (scores.length < 2) {
      axisConsistencies.push(100);
      continue;
    }
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((sum, s) => sum + (s - mean) ** 2, 0) / scores.length;
    const stdDev = Math.sqrt(variance);
    // 最大標準偏差 ≈ 2.5 (例: [5, 0] の場合)。0→100, 2.5→0 にマッピング
    const consistency = Math.round(Math.max(0, (1 - stdDev / 2.5)) * 100);
    axisConsistencies.push(consistency);

    // 標準偏差が2.0以上 = 同じ軸で真逆の回答をしている → フラグ
    if (stdDev >= 2.0) {
      flaggedAxes.push(axis);
    }
  }

  const overall = Math.round(axisConsistencies.reduce((a, b) => a + b, 0) / axisConsistencies.length);

  return { overall, flaggedAxes };
}

export function generateResultId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
