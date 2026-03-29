'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AXIS_LABELS } from '@/lib/questions';
import { getJudgment, type TestResult } from '@/lib/scoring';

interface AiComment {
  judgment: string;
  summary: string;
  strength: string;
  caution: string;
  action: string;
  interview_questions: string[];
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color =
    score >= 75 ? 'bg-[#1D9E75]' :
    score >= 60 ? 'bg-[#4DB89A]' :
    score >= 45 ? 'bg-yellow-500' :
    'bg-red-400';

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
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
  const [aiComment, setAiComment] = useState<AiComment | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    if (!resultId) return;
    const results: TestResult[] = JSON.parse(localStorage.getItem('hana-results') ?? '[]');
    const found = results.find((r) => r.id === resultId);
    if (found) setResult(found);
  }, [resultId]);

  useEffect(() => {
    if (!result) return;
    setAiLoading(true);
    fetch('/api/ai-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: result.candidateName,
        scores: result.scores,
        q10: result.referenceAnswers.q10,
        q20: result.referenceAnswers.q20,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('AI comment generation failed');
        return res.json();
      })
      .then((data) => setAiComment(data))
      .catch((err) => setAiError(err.message))
      .finally(() => setAiLoading(false));
  }, [result]);

  if (!result) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">結果が見つかりません</p>
      </div>
    );
  }

  const judgment = getJudgment(result.scores);
  const avg = Math.round(
    (result.scores.agreeableness + result.scores.conscientiousness +
     result.scores.adaptability + result.scores.proactivity) / 4
  );

  return (
    <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-6">
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
            <p className="text-gray-400">言語</p>
            <p className="font-medium">{result.language.toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* スコア詳細 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          4軸スコア
        </h2>
        <div className="space-y-4">
          <ScoreBar label={AXIS_LABELS.agreeableness.ja} score={result.scores.agreeableness} />
          <ScoreBar label={AXIS_LABELS.conscientiousness.ja} score={result.scores.conscientiousness} />
          <ScoreBar label={AXIS_LABELS.adaptability.ja} score={result.scores.adaptability} />
          <ScoreBar label={AXIS_LABELS.proactivity.ja} score={result.scores.proactivity} />
        </div>
      </div>

      {/* 参考回答 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          参考回答
        </h2>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-400">Q10 前職退職理由:</span>
            <span className="ml-2 font-medium">{result.referenceAnswers.q10 || '-'}</span>
          </div>
          <div>
            <span className="text-gray-400">Q20 期待:</span>
            <span className="ml-2 font-medium">{result.referenceAnswers.q20 || '-'}</span>
          </div>
        </div>
      </div>

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
            AIコメントの取得に失敗しました（APIキーが未設定の可能性があります）
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
