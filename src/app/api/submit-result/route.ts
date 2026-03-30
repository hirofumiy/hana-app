import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { getJudgment, type Scores } from '@/lib/scoring';
import { sendResultNotification } from '@/lib/email';

export async function POST(request: Request) {
  const body = await request.json();
  const { id, candidateName, companyCode, language, answers, scores, referenceAnswers, completedAt } = body;

  if (!id || !companyCode || !scores) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const supabase = createServiceClient();

  // 会社コードの存在確認
  const { data: company } = await supabase
    .from('companies')
    .select('admin_email')
    .eq('company_code', companyCode)
    .single();

  // 会社が未登録でも結果は保存する（デモ利用対応）
  const { error } = await supabase.from('test_results').insert({
    id,
    candidate_name: candidateName || '',
    company_code: companyCode,
    language,
    answers,
    scores,
    reference_answers: referenceAnswers,
    completed_at: completedAt,
  });

  if (error) {
    console.error('DB insert error:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }

  // メール通知（fire-and-forget）
  if (company?.admin_email && process.env.RESEND_API_KEY) {
    const origin = request.headers.get('origin') || 'https://hana-app-ten.vercel.app';
    sendResultNotification({
      adminEmail: company.admin_email,
      candidateName: candidateName || '(氏名未入力)',
      scores: scores as Scores,
      judgment: getJudgment(scores as Scores),
      resultUrl: `${origin}/result?id=${id}`,
    }).catch((err) => console.error('Email send error:', err));
  }

  return NextResponse.json({ success: true, id });
}
