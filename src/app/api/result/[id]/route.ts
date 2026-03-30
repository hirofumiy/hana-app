import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Result not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: data.id,
    candidateName: data.candidate_name,
    companyCode: data.company_code,
    language: data.language,
    answers: data.answers,
    scores: data.scores,
    referenceAnswers: data.reference_answers,
    aiComment: data.ai_comment,
    completedAt: data.completed_at,
  });
}
