'use client';

import { useState, useEffect, useCallback } from 'react';

interface Staff {
  id: string;
  name: string;
  name_native: string | null;
  language: string;
  email: string | null;
  phone: string | null;
  line_user_id: string | null;
  is_active: boolean;
  created_at: string;
}

const LANG_FLAGS: Record<string, string> = {
  vi: '🇻🇳', zh: '🇨🇳', tl: '🇵🇭', id: '🇮🇩', ne: '🇳🇵', th: '🇹🇭', ja: '🇯🇵',
};
const LANG_NAMES: Record<string, string> = {
  vi: 'ベトナム語', zh: '中国語', tl: 'タガログ語', id: 'インドネシア語', ne: 'ネパール語', th: 'タイ語', ja: '日本語',
};

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', name_native: '', language: 'vi', email: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchStaff = useCallback(async () => {
    const res = await fetch('/api/staff');
    const data = await res.json();
    setStaffList(data.staff || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchStaff(); }, [fetchStaff]);

  const resetForm = () => {
    setForm({ name: '', name_native: '', language: 'vi', email: '', phone: '' });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleSave = async () => {
    if (!form.name) { setError('名前は必須です'); return; }
    setSaving(true);
    setError('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { id: editingId, ...form } : form;
      const res = await fetch('/api/staff', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save');
        return;
      }
      resetForm();
      fetchStaff();
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (staff: Staff) => {
    setForm({
      name: staff.name,
      name_native: staff.name_native || '',
      language: staff.language,
      email: staff.email || '',
      phone: staff.phone || '',
    });
    setEditingId(staff.id);
    setShowForm(true);
  };

  const handleDeactivate = async (id: string) => {
    if (!confirm('このスタッフを無効にしますか？')) return;
    await fetch(`/api/staff?id=${id}`, { method: 'DELETE' });
    fetchStaff();
  };

  const activeStaff = staffList.filter(s => s.is_active);
  const inactiveStaff = staffList.filter(s => !s.is_active);

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#0F1F3D]">スタッフ管理</h1>
            <p className="text-sm text-gray-500 mt-0.5">外国人スタッフの登録・管理</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="px-4 py-2 rounded-xl bg-[#1D9E75] hover:bg-[#178a66] text-white text-sm font-semibold transition-colors"
          >
            + スタッフ追加
          </button>
        </div>

        {/* 追加/編集フォーム */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-sm font-semibold text-[#0F1F3D] mb-4">
              {editingId ? 'スタッフ編集' : '新規スタッフ追加'}
            </h2>
            {error && <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">名前（日本語表記）*</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="例: グエン・ヴァン・アン"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">名前（母国語表記）</label>
                <input
                  type="text"
                  value={form.name_native}
                  onChange={e => setForm({ ...form, name_native: e.target.value })}
                  placeholder="例: Nguyễn Văn An"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">言語 *</label>
                <select
                  value={form.language}
                  onChange={e => setForm({ ...form, language: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 outline-none"
                >
                  {Object.entries(LANG_NAMES).filter(([k]) => k !== 'ja').map(([code, name]) => (
                    <option key={code} value={code}>{LANG_FLAGS[code]} {name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">メールアドレス</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">電話番号</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-[#0F1F3D] hover:bg-[#1a3157] text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? '保存中...' : editingId ? '更新' : '追加'}
              </button>
              <button
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* スタッフ一覧 */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">読み込み中...</div>
        ) : activeStaff.length === 0 && !showForm ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-4xl mb-3">👥</div>
            <p className="text-gray-500 text-sm">スタッフが登録されていません</p>
            <p className="text-gray-400 text-xs mt-1">「+ スタッフ追加」から登録してください</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2.5 text-gray-500 font-medium">名前</th>
                  <th className="text-center px-4 py-2.5 text-gray-500 font-medium">言語</th>
                  <th className="text-left px-4 py-2.5 text-gray-500 font-medium hidden md:table-cell">メール</th>
                  <th className="text-center px-4 py-2.5 text-gray-500 font-medium">LINE</th>
                  <th className="text-right px-4 py-2.5 text-gray-500 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {activeStaff.map(staff => (
                  <tr key={staff.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#0F1F3D]">{staff.name}</div>
                      {staff.name_native && <div className="text-xs text-gray-400">{staff.name_native}</div>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-lg" title={LANG_NAMES[staff.language]}>{LANG_FLAGS[staff.language]}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{staff.email || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      {staff.line_user_id ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">連携済</span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-400">未連携</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleEdit(staff)} className="text-xs text-blue-600 hover:text-blue-800 mr-3">編集</button>
                      <button onClick={() => handleDeactivate(staff.id)} className="text-xs text-red-400 hover:text-red-600">無効化</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {inactiveStaff.length > 0 && (
          <details className="mt-4">
            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
              無効化済みスタッフ ({inactiveStaff.length}名)
            </summary>
            <div className="mt-2 space-y-1">
              {inactiveStaff.map(s => (
                <div key={s.id} className="text-xs text-gray-400 px-4 py-1">
                  {LANG_FLAGS[s.language]} {s.name} — {s.email || '(メールなし)'}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
