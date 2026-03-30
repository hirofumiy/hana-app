import { createAuthClient } from '@/lib/supabase/server';
import AdminHeader from './AdminHeader';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let companyName: string | null = null;

  try {
    const supabase = await createAuthClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('companies')
        .select('company_name')
        .eq('admin_user_id', user.id)
        .single();
      companyName = data?.company_name ?? null;
    }
  } catch {
    // ログイン・登録ページではエラーを無視
  }

  return (
    <div className="flex-1 flex flex-col">
      {companyName && <AdminHeader companyName={companyName} />}
      {children}
    </div>
  );
}
