'use client';

import { useState, useMemo } from 'react';

interface Company {
  id: string;
  company_code: string;
  company_name: string;
  admin_email: string;
  created_at: string;
}

interface TestResult {
  id: string;
  candidate_name: string;
  company_code: string;
  scores: {
    agreeableness: number;
    conscientiousness: number;
    adaptability: number;
    proactivity: number;
  };
  language: string;
  completed_at: string;
  ai_comment?: {
    judgment: string;
    summary: string;
  } | null;
}

interface Props {
  companies: Company[];
  results: TestResult[];
}

export default function SuperAdminContent({ companies, results }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'companies' | 'results'>('overview');

  // KPI計算
  const kpi = useMemo(() => {
    const now = new Date();
    const thisMonth = results.filter(r => {
      const d = new Date(r.completed_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const lastMonth = results.filter(r => {
      const d = new Date(r.completed_at);
      const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear();
    });

    // 企業ごとのテスト数
    const companyUsage = companies.map(c => ({
      ...c,
      testCount: results.filter(r => r.company_code === c.company_code).length,
      lastTest: results.find(r => r.company_code === c.company_code)?.completed_at || null,
    }));

    return {
      totalCompanies: companies.length,
      totalTests: results.length,
      thisMonthTests: thisMonth.length,
      lastMonthTests: lastMonth.length,
      companyUsage,
    };
  }, [companies, results]);

  const judgmentColor: Record<string, string> = {
    A: 'bg-green-100 text-green-700',
    B: 'bg-blue-100 text-blue-700',
    C: 'bg-yellow-100 text-yellow-700',
    D: 'bg-red-100 text-red-700',
  };

  const getJudgment = (scores: TestResult['scores']) => {
    const avg = (scores.agreeableness + scores.conscientiousness + scores.adaptability + scores.proactivity) / 4;
    if (avg < 50 || scores.conscientiousness < 40) return 'D';
    if (scores.conscientiousness < 55 || scores.adaptability < 55) return 'C';
    if (avg >= 75 && scores.conscientiousness >= 70) return 'A';
    if (avg >= 60) return 'B';
    return 'C';
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F1F3D]">Master Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Hana プラットフォーム全体の管理</p>
        </div>

        {/* KPIカード */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500">登録企業数</p>
            <p className="text-3xl font-bold text-[#0F1F3D] mt-1">{kpi.totalCompanies}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500">総テスト数</p>
            <p className="text-3xl font-bold text-[#1D9E75] mt-1">{kpi.totalTests}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500">今月のテスト</p>
            <p className="text-3xl font-bold text-[#0F1F3D] mt-1">{kpi.thisMonthTests}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500">先月のテスト</p>
            <p className="text-3xl font-bold text-gray-400 mt-1">{kpi.lastMonthTests}</p>
          </div>
        </div>

        {/* タブ */}
        <div className="flex gap-1 mb-4 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit">
          {(['overview', 'companies', 'results'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#0F1F3D] text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'overview' ? '概要' : tab === 'companies' ? '企業一覧' : '全テスト結果'}
            </button>
          ))}
        </div>

        {/* 概要タブ */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-[#0F1F3D]">企業別利用状況</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">企業名</th>
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">コード</th>
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">管理者メール</th>
                      <th className="text-center px-4 py-2 text-gray-500 font-medium">テスト数</th>
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">最終利用</th>
                      <th className="text-left px-4 py-2 text-gray-500 font-medium">登録日</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpi.companyUsage.map(c => (
                      <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-[#0F1F3D]">{c.company_name}</td>
                        <td className="px-4 py-3 text-gray-600">
                          <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{c.company_code}</code>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{c.admin_email}</td>
                        <td className="px-4 py-3 text-center font-semibold text-[#1D9E75]">{c.testCount}</td>
                        <td className="px-4 py-3 text-gray-500">
                          {c.lastTest ? new Date(c.lastTest).toLocaleDateString('ja-JP') : '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-500">
                          {new Date(c.created_at).toLocaleDateString('ja-JP')}
                        </td>
                      </tr>
                    ))}
                    {kpi.companyUsage.length === 0 && (
                      <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">登録企業がありません</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 企業一覧タブ */}
        {activeTab === 'companies' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">企業名</th>
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">会社コード</th>
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">管理者メール</th>
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">登録日</th>
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">受験URL</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(c => (
                    <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-[#0F1F3D]">{c.company_name}</td>
                      <td className="px-4 py-3">
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{c.company_code}</code>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.admin_email}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(c.created_at).toLocaleDateString('ja-JP')}</td>
                      <td className="px-4 py-3">
                        <code className="text-xs text-blue-600 break-all">/?code={c.company_code}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 全テスト結果タブ */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">候補者名</th>
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">企業コード</th>
                    <th className="text-center px-4 py-2 text-gray-500 font-medium">判定</th>
                    <th className="text-center px-4 py-2 text-gray-500 font-medium">協調</th>
                    <th className="text-center px-4 py-2 text-gray-500 font-medium">誠実</th>
                    <th className="text-center px-4 py-2 text-gray-500 font-medium">適応</th>
                    <th className="text-center px-4 py-2 text-gray-500 font-medium">積極</th>
                    <th className="text-center px-4 py-2 text-gray-500 font-medium">平均</th>
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">言語</th>
                    <th className="text-left px-4 py-2 text-gray-500 font-medium">受験日</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(r => {
                    const j = r.ai_comment?.judgment || getJudgment(r.scores);
                    const avg = Math.round(
                      (r.scores.agreeableness + r.scores.conscientiousness + r.scores.adaptability + r.scores.proactivity) / 4
                    );
                    return (
                      <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50 cursor-pointer"
                          onClick={() => window.open(`/result?id=${r.id}`, '_blank')}>
                        <td className="px-4 py-3 font-medium text-[#0F1F3D]">{r.candidate_name || '(未入力)'}</td>
                        <td className="px-4 py-3">
                          <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{r.company_code}</code>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${judgmentColor[j] || 'bg-gray-100 text-gray-600'}`}>
                            {j}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">{r.scores.agreeableness}</td>
                        <td className="px-4 py-3 text-center">{r.scores.conscientiousness}</td>
                        <td className="px-4 py-3 text-center">{r.scores.adaptability}</td>
                        <td className="px-4 py-3 text-center">{r.scores.proactivity}</td>
                        <td className="px-4 py-3 text-center font-semibold">{avg}</td>
                        <td className="px-4 py-3 text-gray-500">{r.language}</td>
                        <td className="px-4 py-3 text-gray-500">{new Date(r.completed_at).toLocaleDateString('ja-JP')}</td>
                      </tr>
                    );
                  })}
                  {results.length === 0 && (
                    <tr><td colSpan={10} className="px-4 py-8 text-center text-gray-400">テスト結果がありません</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
