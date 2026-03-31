'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  category: string;
  subject_ja: string;
  body_ja: string;
  translation_status: string;
  delivery_channels: string[];
  created_at: string;
  delivery: { total: number; sent: number; read: number };
}

const CATEGORY_LABELS: Record<string, string> = {
  shift_change: 'シフト変更',
  work_instruction: '業務連絡',
  encouragement: '励まし',
  general: 'お知らせ',
};

const CATEGORY_COLORS: Record<string, string> = {
  shift_change: 'bg-orange-100 text-orange-700',
  work_instruction: 'bg-blue-100 text-blue-700',
  encouragement: 'bg-pink-100 text-pink-700',
  general: 'bg-gray-100 text-gray-700',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        setNotifications(data.notifications || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-[#0F1F3D]">通知配信</h1>
            <p className="text-sm text-gray-500 mt-0.5">多言語通知の作成・配信履歴</p>
          </div>
          <a
            href="/admin/notifications/new"
            className="px-4 py-2 rounded-xl bg-[#1D9E75] hover:bg-[#178a66] text-white text-sm font-semibold transition-colors"
          >
            + 新規通知
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">読み込み中...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-4xl mb-3">📢</div>
            <p className="text-gray-500 text-sm">まだ通知を送信していません</p>
            <p className="text-gray-400 text-xs mt-1">「+ 新規通知」から作成してください</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[n.category] || CATEGORY_COLORS.general}`}>
                        {CATEGORY_LABELS[n.category] || n.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(n.created_at).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <h3 className="font-medium text-[#0F1F3D] text-sm">{n.subject_ja}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.body_ja}</p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <div className="text-xs text-gray-400">配信</div>
                    <div className="text-sm font-semibold text-[#1D9E75]">
                      {n.delivery.sent}/{n.delivery.total}
                    </div>
                    {n.delivery.read > 0 && (
                      <div className="text-xs text-gray-400">
                        既読 {n.delivery.read}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
