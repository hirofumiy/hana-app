'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminRegister() {
  const router = useRouter();
  const [companyCode, setCompanyCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();

    // 会社コード重複チェック
    const { data: existing } = await supabase
      .from('companies')
      .select('id')
      .eq('company_code', companyCode)
      .maybeSingle();

    if (existing) {
      setError('この会社コードは既に登録されています');
      setLoading(false);
      return;
    }

    // ユーザー作成
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      setError(authError?.message || '登録に失敗しました');
      setLoading(false);
      return;
    }

    // 会社情報登録（signUp後のセッションで実行）
    const { error: insertError } = await supabase.from('companies').insert({
      company_code: companyCode,
      company_name: companyName,
      admin_email: email,
      admin_user_id: authData.user.id,
    });

    if (insertError) {
      setError('会社情報の登録に失敗しました: ' + insertError.message);
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0F1F3D] mb-3">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0F1F3D]">企業アカウント登録</h1>
          <p className="text-sm text-gray-500 mt-1">Hana 管理画面</p>
        </div>

        <form onSubmit={handleRegister} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">会社コード</label>
            <input
              type="text"
              value={companyCode}
              onChange={(e) => setCompanyCode(e.target.value.toUpperCase())}
              placeholder="例: YAMAMOTO-FOODS"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0F1F3D] focus:ring-2 focus:ring-[#0F1F3D]/20 outline-none text-base"
            />
            <p className="text-xs text-gray-400 mt-1">テスト受験者に共有するコードです</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">企業名</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="例: 株式会社山本フーズ"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0F1F3D] focus:ring-2 focus:ring-[#0F1F3D]/20 outline-none text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">管理者メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0F1F3D] focus:ring-2 focus:ring-[#0F1F3D]/20 outline-none text-base"
            />
            <p className="text-xs text-gray-400 mt-1">テスト結果の通知先になります</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0F1F3D] focus:ring-2 focus:ring-[#0F1F3D]/20 outline-none text-base"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0F1F3D] hover:bg-[#1a3157] text-white font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? '登録中...' : '登録する'}
          </button>
          <a href="/admin/login" className="block text-center text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← ログインに戻る
          </a>
        </form>
      </div>
    </div>
  );
}
