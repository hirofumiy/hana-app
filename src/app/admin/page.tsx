import { redirect } from 'next/navigation';
import { createAuthClient } from '@/lib/supabase/server';
import DashboardContent from './DashboardContent';

export default async function AdminDashboard() {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  const { data: company } = await supabase
    .from('companies')
    .select('company_code, company_name')
    .eq('admin_user_id', user.id)
    .single();

  if (!company) redirect('/admin/register');

  const { data: results } = await supabase
    .from('test_results')
    .select('id, candidate_name, scores, language, completed_at, ai_comment')
    .eq('company_code', company.company_code)
    .order('completed_at', { ascending: false });

  return (
    <DashboardContent
      companyCode={company.company_code}
      results={results ?? []}
    />
  );
}
