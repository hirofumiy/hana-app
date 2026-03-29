// Hana 採点ロジック
import { questions, type Question } from './questions';

export interface Scores {
  agreeableness: number;
  conscientiousness: number;
  adaptability: number;
  proactivity: number;
}

export interface TestResult {
  id: string;
  candidateName: string;
  companyCode: string;
  language: string;
  answers: Record<number, number>; // questionId -> choiceIndex (0-3)
  scores: Scores;
  referenceAnswers: { q10: string; q15: string; q20: string };
  completedAt: string;
}

// 逆スコア設問: Q7, Q8, Q9, Q11, Q13, Q19
// 参考設問(計算外): Q10, Q15, Q20

function getScore(question: Question, choiceIndex: number): number {
  if (question.referenceOnly) return 0;

  const normalScores = [4, 3, 2, 1]; // A=4, B=3, C=2, D=1
  const reverseScores = [1, 2, 3, 4]; // A=1, B=2, C=3, D=4 (逆スコアだが高い方が良いので実質同じ意味で反転)

  // 逆スコア設問は、Aが「良い回答」なので高得点を付ける
  // 仕様: 逆スコア設問 A=1, B=2, C=3, D=4 だが、これは「Aが良い回答で4点相当」の意味
  // → 実際はA=4, B=3, C=2, D=1で統一（逆スコアの意味は選択肢の文面が逆転しているため）
  if (question.reverseScore) {
    return reverseScores[choiceIndex] ?? 0;
  }
  return normalScores[choiceIndex] ?? 0;
}

export function calculateScores(answers: Record<number, number>): Scores {
  const axisTotals: Record<Question['axis'], number> = {
    agreeableness: 0,
    conscientiousness: 0,
    adaptability: 0,
    proactivity: 0,
  };

  const axisCounts: Record<Question['axis'], number> = {
    agreeableness: 0,
    conscientiousness: 0,
    adaptability: 0,
    proactivity: 0,
  };

  for (const q of questions) {
    if (q.referenceOnly) continue;
    const choiceIndex = answers[q.id];
    if (choiceIndex === undefined) continue;

    axisTotals[q.axis] += getScore(q, choiceIndex);
    axisCounts[q.axis]++;
  }

  // 各軸: 有効回答数の合計(最大20点) → 100点換算(×5)
  // 各軸の計算対象設問数（referenceOnly除外）:
  // 協調性: Q1-Q5 → 5問, 最大20点 → ×5 = 100
  // 誠実性: Q6-Q9 → 4問, 最大16点 → 100点換算
  // 適応力: Q11-Q14 → 4問(Q11,12,13,14), 最大16点 → 100点換算
  // 積極性: Q16-Q19 → 4問, 最大16点 → 100点換算
  return {
    agreeableness: Math.round((axisTotals.agreeableness / (axisCounts.agreeableness * 4)) * 100),
    conscientiousness: Math.round((axisTotals.conscientiousness / (axisCounts.conscientiousness * 4)) * 100),
    adaptability: Math.round((axisTotals.adaptability / (axisCounts.adaptability * 4)) * 100),
    proactivity: Math.round((axisTotals.proactivity / (axisCounts.proactivity * 4)) * 100),
  };
}

export function getJudgment(scores: Scores): 'A' | 'B' | 'C' | 'D' {
  const avg = (scores.agreeableness + scores.conscientiousness + scores.adaptability + scores.proactivity) / 4;

  if (scores.conscientiousness < 40) return 'D';
  if (avg < 50) return 'D';
  if (scores.conscientiousness < 55 || scores.adaptability < 55) return 'C';
  if (avg >= 75 && scores.conscientiousness >= 70) return 'A';
  if (avg >= 60) return 'B';
  return 'C';
}

export function generateResultId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
