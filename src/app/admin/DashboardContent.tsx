'use client';

import { useState, useMemo } from 'react';
import { getJudgment, type Scores } from '@/lib/scoring';
import { exportCsv } from './csv-export';

interface ResultRow {
  id: string;
  candidate_name: string;
  scores: Scores;
  language: string;
  completed_at: string;
  ai_comment: unknown;
}

type SortKey = 'name' | 'date' | 'avg' | 'judgment';
type SortDir = 'asc' | 'desc';

function JudgmentBadgeSmall({ judgment }: { judgment: string }) {
  const styles: Record<string, string> = {
    A: 'bg-[#1D9E75]/10 text-[#1D9E75]',
    B: 'bg-blue-50 text-blue-600',
    C: 'bg-yellow-50 text-yellow-600',
    D: 'bg-red-50 text-red-500',
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${styles[judgment] ?? styles.C}`}>
      {judgment}
    </span>
  );
}

export default function DashboardContent({
  companyCode,
  results,
}: {
  companyCode: string;
  results: ResultRow[];
}) {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [judgmentFilter, setJudgmentFilter] = useState<string[]>([]);

  const enriched = useMemo(() =>
    results.map((r) => {
      const avg = Math.round(
        (r.scores.agreeableness + r.scores.conscientiousness + r.scores.adaptability + r.scores.proactivity) / 4
      );
      return { ...r, avg, judgment: getJudgment(r.scores) };
    }),
  [results]);

  const filtered = useMemo(() => {
    let list = enriched;
    if (judgmentFilter.length > 0) {
      list = list.filter((r) => judgmentFilter.includes(r.judgment));
    }
    return list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = a.candidate_name.localeCompare(b.candidate_name);
      else if (sortKey === 'date') cmp = new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime();
      else if (sortKey === 'avg') cmp = a.avg - b.avg;
      else if (sortKey === 'judgment') cmp = a.judgment.localeCompare(b.judgment);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [enriched, sortKey, sortDir, judgmentFilter]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const toggleJudgment = (j: string) => {
    setJudgmentFilter((prev) =>
      prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j]
    );
  };

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return '↕';
    return sortDir === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#0F1F3D]">テスト結果一覧</h1>
          <p className="text-sm text-gray-400">{filtered.length}件 / 全{results.length}件</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportCsv(filtered, companyCode)}
            className="px-4 py-2 text-sm rounded-lg bg-[#1D9E75] text-white hover:bg-[#178a66] transition-colors"
          >
            CSV出力
          </button>
        </div>
      </div>

      {/* フィルター */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <span className="text-sm text-gray-500 py-1">判定:</span>
        {['A', 'B', 'C', 'D'].map((j) => (
          <button
            key={j}
            onClick={() => toggleJudgment(j)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              judgmentFilter.includes(j)
                ? 'bg-[#0F1F3D] text-white border-[#0F1F3D]'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
            }`}
          >
            {j}
          </button>
        ))}
        {judgmentFilter.length > 0 && (
          <button
            onClick={() => setJudgmentFilter([])}
            className="px-3 py-1 text-sm text-gray-400 hover:text-gray-600"
          >
            クリア
          </button>
        )}
      </div>

      {/* テスト URL */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="text-xs text-gray-400 mb-1">テスト受験URL（候補者に共有）</p>
        <code className="text-sm text-[#1D9E75] break-all">
          {typeof window !== 'undefined' ? window.location.origin : ''}/?code={companyCode}
        </code>
      </div>

      {/* テーブル */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => toggleSort('name')}>
                  候補者 {sortIcon('name')}
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => toggleSort('date')}>
                  受験日 {sortIcon('date')}
                </th>
                <th className="text-center px-3 py-3 font-medium text-gray-500">協</th>
                <th className="text-center px-3 py-3 font-medium text-gray-500">誠</th>
                <th className="text-center px-3 py-3 font-medium text-gray-500">適</th>
                <th className="text-center px-3 py-3 font-medium text-gray-500">積</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => toggleSort('avg')}>
                  平均 {sortIcon('avg')}
                </th>
                <th className="text-center px-4 py-3 font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => toggleSort('judgment')}>
                  判定 {sortIcon('judgment')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    テスト結果がありません
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <a href={`/result?id=${r.id}`} className="text-[#0F1F3D] font-medium hover:text-[#1D9E75] transition-colors">
                        {r.candidate_name || '(未入力)'}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(r.completed_at).toLocaleDateString('ja-JP')}
                    </td>
                    <td className="text-center px-3 py-3 font-mono">{r.scores.agreeableness}</td>
                    <td className="text-center px-3 py-3 font-mono">{r.scores.conscientiousness}</td>
                    <td className="text-center px-3 py-3 font-mono">{r.scores.adaptability}</td>
                    <td className="text-center px-3 py-3 font-mono">{r.scores.proactivity}</td>
                    <td className="text-center px-4 py-3 font-bold">{r.avg}</td>
                    <td className="text-center px-4 py-3">
                      <JudgmentBadgeSmall judgment={r.judgment} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
