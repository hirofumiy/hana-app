'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Staff {
  id: string;
  name: string;
  name_native: string | null;
  language: string;
  email: string | null;
  is_active: boolean;
}

const LANG_FLAGS: Record<string, string> = {
  vi: '🇻🇳', zh: '🇨🇳', tl: '🇵🇭', id: '🇮🇩', ne: '🇳🇵', th: '🇹🇭',
};

const CATEGORIES = [
  { value: 'shift_change', label: 'シフト変更', emoji: '📅', hint: 'シフトや勤務時間の変更連絡' },
  { value: 'work_instruction', label: '業務連絡', emoji: '📋', hint: '作業手順や業務の指示' },
  { value: 'encouragement', label: '励まし・感謝', emoji: '💪', hint: '日頃のお礼や激励のメッセージ' },
  { value: 'general', label: 'お知らせ', emoji: '📢', hint: 'その他の一般的な連絡事項' },
];

type Step = 'compose' | 'recipients' | 'sending' | 'done';

export default function NewNotificationPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('compose');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [category, setCategory] = useState('general');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [sendResult, setSendResult] = useState<{ deliveryCount: number } | null>(null);

  useEffect(() => {
    fetch('/api/staff')
      .then(res => res.json())
      .then(data => setStaffList((data.staff || []).filter((s: Staff) => s.is_active)));
  }, []);

  const handleSelectAll = () => {
    if (selectedStaff.length === staffList.length) {
      setSelectedStaff([]);
    } else {
      setSelectedStaff(staffList.map(s => s.id));
    }
  };

  const toggleStaff = (id: string) => {
    setSelectedStaff(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSend = async () => {
    setStep('sending');
    setError('');

    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject_ja: subject,
          body_ja: body,
          category,
          staff_ids: selectedStaff,
          channels: ['email'],
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || '送信に失敗しました');
        setStep('recipients');
        return;
      }

      const result = await res.json();
      setSendResult(result);
      setStep('done');
    } catch {
      setError('通信エラーが発生しました');
      setStep('recipients');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-6">
          <a href="/admin/notifications" className="text-xs text-gray-400 hover:text-gray-600">← 通知一覧</a>
          <h1 className="text-xl font-bold text-[#0F1F3D] mt-2">新規通知を作成</h1>
          {/* ステップ表示 */}
          <div className="flex items-center gap-2 mt-3">
            {(['compose', 'recipients', 'sending'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s || (step === 'done' && i <= 2) ? 'bg-[#1D9E75] text-white' :
                  (['compose', 'recipients', 'sending', 'done'].indexOf(step) > i) ? 'bg-[#1D9E75] text-white' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {i + 1}
                </div>
                {i < 2 && <div className="w-8 h-0.5 bg-gray-200" />}
              </div>
            ))}
            <span className="text-xs text-gray-400 ml-2">
              {step === 'compose' ? '内容作成' : step === 'recipients' ? '送信先選択' : step === 'sending' ? '翻訳・送信中...' : '完了'}
            </span>
          </div>
        </div>

        {/* Step 1: 内容作成 */}
        {step === 'compose' && (
          <div className="space-y-5">
            {/* カテゴリ選択 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c.value}
                    onClick={() => setCategory(c.value)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left transition-all ${
                      category === c.value
                        ? 'border-[#1D9E75] bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl">{c.emoji}</span>
                    <div>
                      <div className="text-sm font-medium text-[#0F1F3D]">{c.label}</div>
                      <div className="text-xs text-gray-400">{c.hint}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 件名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">件名（日本語）</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="例: 明日のシフト変更について"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 outline-none"
              />
            </div>

            {/* 本文 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">本文（日本語）</label>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={6}
                placeholder="日本語で入力してください。AI が自動で6言語に翻訳して配信します。"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:border-[#1D9E75] focus:ring-1 focus:ring-[#1D9E75]/20 outline-none resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                💡 シンプルで短い文章が翻訳精度を高めます
              </p>
            </div>

            <button
              onClick={() => {
                if (!subject || !body) { setError('件名と本文を入力してください'); return; }
                setError('');
                setStep('recipients');
              }}
              className="w-full py-3 rounded-xl bg-[#0F1F3D] hover:bg-[#1a3157] text-white font-semibold transition-colors"
            >
              次へ：送信先を選択
            </button>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </div>
        )}

        {/* Step 2: 送信先選択 */}
        {step === 'recipients' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
              <div className="text-xs text-gray-400 mb-1">送信内容プレビュー</div>
              <div className="text-sm font-medium text-[#0F1F3D]">{subject}</div>
              <div className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">{body}</div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">送信先スタッフ</label>
              <button onClick={handleSelectAll} className="text-xs text-[#1D9E75] hover:underline">
                {selectedStaff.length === staffList.length ? '全解除' : '全選択'}
              </button>
            </div>

            {staffList.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500">スタッフが登録されていません</p>
                <a href="/admin/staff" className="text-xs text-[#1D9E75] hover:underline mt-1 inline-block">スタッフを登録する</a>
              </div>
            ) : (
              <div className="space-y-2">
                {staffList.map(staff => (
                  <button
                    key={staff.id}
                    onClick={() => toggleStaff(staff.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      selectedStaff.includes(staff.id)
                        ? 'border-[#1D9E75] bg-green-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                      selectedStaff.includes(staff.id) ? 'border-[#1D9E75] bg-[#1D9E75]' : 'border-gray-300'
                    }`}>
                      {selectedStaff.includes(staff.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-lg">{LANG_FLAGS[staff.language]}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#0F1F3D]">{staff.name}</div>
                      <div className="text-xs text-gray-400">{staff.email || '(メール未設定)'}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setStep('compose')}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
              >
                戻る
              </button>
              <button
                onClick={() => {
                  if (selectedStaff.length === 0) { setError('送信先を1人以上選択してください'); return; }
                  setError('');
                  handleSend();
                }}
                className="flex-1 py-3 rounded-xl bg-[#1D9E75] hover:bg-[#178a66] text-white font-semibold transition-colors"
              >
                翻訳して送信（{selectedStaff.length}名）
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 送信中 */}
        {step === 'sending' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="inline-block animate-spin w-10 h-10 border-4 border-gray-200 border-t-[#1D9E75] rounded-full mb-4" />
            <p className="text-sm font-medium text-[#0F1F3D]">AI が翻訳中...</p>
            <p className="text-xs text-gray-400 mt-1">日本語 → 6言語に翻訳してメール配信しています</p>
          </div>
        )}

        {/* Step 4: 完了 */}
        {step === 'done' && sendResult && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-lg font-bold text-[#0F1F3D]">送信完了</h2>
            <p className="text-sm text-gray-500 mt-2">
              {sendResult.deliveryCount}名のスタッフに通知を配信しました
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <a
                href="/admin/notifications"
                className="px-5 py-2.5 rounded-xl bg-[#0F1F3D] hover:bg-[#1a3157] text-white text-sm font-semibold transition-colors"
              >
                配信履歴を見る
              </a>
              <button
                onClick={() => {
                  setSubject('');
                  setBody('');
                  setSelectedStaff([]);
                  setSendResult(null);
                  setStep('compose');
                }}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                新しい通知を作成
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
