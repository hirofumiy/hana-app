import { redirect } from 'next/navigation';
import { createAuthClient } from '@/lib/supabase/server';

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const superEmails = (process.env.SUPER_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);

  if (superEmails.length === 0) {
    redirect('/admin/login');
  }

  try {
    const supabase = await createAuthClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !superEmails.includes(user.email?.toLowerCase() || '')) {
      redirect('/admin/login');
    }
  } catch {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-[#0F1F3D] text-white px-4 py-3 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E74C3C] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-semibold">Hana</span>
            <span className="text-xs text-red-300 ml-2">Master Admin</span>
          </div>
        </div>
        <a href="/admin" className="text-xs text-gray-300 hover:text-white transition-colors">
          企業管理画面へ
        </a>
      </header>
      {children}
    </div>
  );
}
