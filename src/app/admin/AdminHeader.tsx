'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminHeader({ companyName }: { companyName: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="bg-[#0F1F3D] text-white px-4 py-3 flex items-center justify-between print:hidden">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#1D9E75] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <span className="text-sm font-semibold">Hana</span>
          <span className="text-xs text-gray-300 ml-2">{companyName}</span>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="text-xs text-gray-300 hover:text-white transition-colors"
      >
        ログアウト
      </button>
    </header>
  );
}
