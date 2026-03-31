'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AXIS_LABELS, type Axis } from '@/lib/questions';
import { getJudgment, getStrengthsAndWeaknesses, type TestResult, type ConsistencyResult } from '@/lib/scoring';

interface AiComment {
  judgment: string;
  summary: string;
  strength: string;
  caution: string;
  action: string;
  interview_questions: string[];
}

function ScoreBar({ label, score, isStrength, isWeakness }: {
  label: string; score: number; isStrength?: boolean; isWeakness?: boolean;
}) {
  const color =
    score >= 75 ? 'bg-[#1D9E75]' :
    score >= 60 ? 'bg-[#4DB89A]' :
    score >= 45 ? 'bg-yellow-500' :
    'bg-red-400';

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700 flex items-center gap-1.5">
          {isStrength && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">強み</span>}
          {isWeakness && <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full font-semibold">課題</span>}
          {label}
        </span>
        <span className="font-bold text-[#0F1F3D]">{score}</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function JudgmentBadge({ judgment }: { judgment: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    A: { bg: 'bg-[#1D9E75]/10', text: 'text-[#1D9E75]', label: 'A - 推奨' },
    B: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'B - 良好' },
    C: { bg: 'bg-yellow-50', text: 'text-yellow-600', label: 'C - 要確認' },
    D: { bg: 'bg-red-50', text: 'text-red-500', label: 'D - 注意' },
  };
  const c = config[judgment] ?? config.C;
  return (
    <span className={`inline-flex px-4 py-2 rounded-full text-lg font-bold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const resultId = searchParams.get('id');
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiComment, setAiComment] = useState<AiComment | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    if (!resultId) { setLoading(false); return; }

    fetch(`/api/result/${resultId}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then((data) => {
        setResult(data);
        if (data.aiComment) setAiComment(data.aiComment);
      })
      .catch(() => {
        const results: TestResult[] = JSON.parse(localStorage.getItem('hana-results') ?? '[]');
        const found = results.find((r) => r.id === resultId);
        if (found) setResult(found);
      })
      .finally(() => setLoading(false));
  }, [resultId]);

  useEffect(() => {
    if (!result || aiComment) return;
    setAiLoading(true);
    fetch('/api/ai-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: result.candidateName,
        scores: result.scores,
        industryScore: result.industryScore,
        resultId: result.id,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('AI comment generation failed');
        return res.json();
      })
      .then((data) => setAiComment(data))
      .catch((err) => setAiError(err.message))
      .finally(() => setAiLoading(false));
  }, [result, aiComment]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">結果が見つかりません</p>
      </div>
    );
  }

  const judgment = getJudgment(result.scores);
  const { strengths, weaknesses } = getStrengthsAndWeaknesses(result.scores);
  const scoreValues = Object.values(result.scores) as number[];
  const avg = Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);

  const axisOrder: Axis[] = ['agreeableness', 'conscientiousness', 'adaptability', 'proactivity', 'stressTolerance'];

  return (
    <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1D9E75] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#0F1F3D]">特性テスト結果</h1>
            <p className="text-xs text-gray-400">管理者向けページ</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="print:hidden px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          印刷 / PDF
        </button>
      </div>

      {/* 候補者情報 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">候補者名</p>
            <p className="text-lg font-semibold text-[#0F1F3D]">
              {result.candidateName || '(未入力)'}
            </p>
          </div>
          <JudgmentBadge judgment={aiComment?.judgment ?? judgment} />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div>
            <p className="text-gray-400">会社コード</p>
            <p className="font-medium">{result.companyCode || '-'}</p>
          </div>
          <div>
            <p className="text-gray-400">受験日</p>
            <p className="font-medium">{new Date(result.completedAt).toLocaleDateString('ja-JP')}</p>
          </div>
          <div>
            <p className="text-gray-400">総合スコア</p>
            <p className="font-bold text-[#1D9E75] text-lg">{avg} / 100</p>
          </div>
          <div>
            <p className="text-gray-400">業種適性</p>
            <p className="font-bold text-[#0F1F3D] text-lg">{result.industryScore ?? '-'} / 100</p>
          </div>
        </div>
      </div>

      {/* 5軸スコア */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          5軸スコア
        </h2>
        <div className="space-y-4">
          {axisOrder.map(axis => (
            <ScoreBar
              key={axis}
              label={AXIS_LABELS[axis].ja}
              score={result.scores[axis]}
              isStrength={strengths.includes(axis)}
              isWeakness={weaknesses.includes(axis)}
            />
          ))}
        </div>
      </div>

      {/* 強み・課題サマリー */}
      {(strengths.length > 0 || weaknesses.length > 0) && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            特性サマリー
          </h2>
          <div className="space-y-3 text-sm">
            {strengths.length > 0 && (
              <div>
                <p className="text-green-700 font-medium mb-1">💪 強み</p>
                <p className="text-gray-700">
                  {strengths.map(a => AXIS_LABELS[a].ja).join('・')}のスコアが高く、この分野で力を発揮できる傾向があります。
                </p>
              </div>
            )}
            {weaknesses.length > 0 && (
              <div>
                <p className="text-orange-700 font-medium mb-1">⚠️ 課題</p>
                <p className="text-gray-700">
                  {weaknesses.map(a => AXIS_LABELS[a].ja).join('・')}のスコアが相対的に低く、フォローアップが推奨されます。
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 回答一貫性 */}
      {result.consistency && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            回答の一貫性
          </h2>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">信頼度</span>
                <span className={`font-bold ${
                  result.consistency.overall >= 80 ? 'text-[#1D9E75]' :
                  result.consistency.overall >= 60 ? 'text-yellow-600' :
                  'text-red-500'
                }`}>
                  {result.consistency.overall}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.consistency.overall >= 80 ? 'bg-[#1D9E75]' :
                    result.consistency.overall >= 60 ? 'bg-yellow-500' :
                    'bg-red-400'
                  }`}
                  style={{ width: `${result.consistency.overall}%` }}
                />
              </div>
            </div>
          </div>
          {result.consistency.flaggedAxes && result.consistency.flaggedAxes.length > 0 && (
            <div className="mt-2 px-3 py-2 bg-red-50 rounded-lg">
              <p className="text-xs text-red-600">
                🚩 {result.consistency.flaggedAxes.map(a => AXIS_LABELS[a].ja).join('・')}の回答にばらつきがあります。
                面接で確認することを推奨します。
              </p>
            </div>
          )}
          {result.consistency.overall >= 80 && (
            <p className="text-xs text-gray-400 mt-2">✓ 回答に一貫性があり、結果の信頼性は高いと判断されます。</p>
          )}
        </div>
      )}

      {/* AIコメント */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          AI分析コメント
        </h2>
        {aiLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
            <div className="w-4 h-4 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
            分析中...
          </div>
        )}
        {aiError && (
          <p className="text-sm text-red-400 py-2">
            AIコメントの取得に失敗しました
          </p>
        )}
        {aiComment && (
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-1">総合評価</p>
              <p className="font-medium text-[#0F1F3D]">{aiComment.summary}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">強み</p>
              <p className="text-gray-700">{aiComment.strength}</p>
            </div>
            {aiComment.caution && (
              <div>
                <p className="text-gray-400 text-xs mb-1">注意点</p>
                <p className="text-yellow-700">{aiComment.caution}</p>
              </div>
            )}
            <div>
              <p className="text-gray-400 text-xs mb-1">採用後のアクション</p>
              <p className="text-gray-700">{aiComment.action}</p>
            </div>
            {aiComment.interview_questions?.length > 0 && (
              <div>
                <p className="text-gray-400 text-xs mb-1">面接質問候補</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {aiComment.interview_questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-gray-300 mt-4 pb-4">
        Result ID: {result.id}
      </p>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}
