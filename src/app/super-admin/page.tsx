import { redirect } from 'next/navigation';
import { createAuthClient, createServiceClient } from '@/lib/supabase/server';
import SuperAdminContent from './SuperAdminContent';

export const dynamic = 'force-dynamic';

export default async function SuperAdminPage() {
  // 認証チェック（layoutでも行うが二重チェック）
  const superEmails = (process.env.SUPER_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !superEmails.includes(user.email?.toLowerCase() || '')) {
    redirect('/admin/login');
  }

  // サービスロールで全データ取得（RLSバイパス）
  const service = createServiceClient();

  const { data: companies } = await service
    .from('companies')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: results } = await service
    .from('test_results')
    .select('id, candidate_name, company_code, scores, language, completed_at, ai_comment')
    .order('completed_at', { ascending: false });

  return (
    <SuperAdminContent
      companies={companies ?? []}
      results={results ?? []}
    />
  );
}
