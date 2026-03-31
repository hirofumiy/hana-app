import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { getJudgment, type Scores } from '@/lib/scoring';
import { sendResultNotification } from '@/lib/email';

export async function POST(request: Request) {
  const body = await request.json();
  const { id, candidateName, companyCode, language, answers, scores, industryScore, completedAt } = body;

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
    industry_score: industryScore ?? null,
    completed_at: completedAt,
  });

  if (error) {
    console.error('DB insert error:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }

  // AI分析を生成 → メール通知
  if (company?.admin_email) {
    const origin = request.headers.get('origin') || 'https://hana-app-ten.vercel.app';
    try {
      let aiComment = null;
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (apiKey) {
        const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 600,
            system: `あなたは外国人採用の専門家AIです。特性テストのスコアから採用担当者向けの日本語レポートをJSONで返してください。
ルール：断定ではなく「〜の傾向があります」の表現を使う。ネガティブ評価は「注意点」として記述（差別的表現・国籍への言及は絶対禁止）。採用担当者が具体的に動けるアクションを必ず含める。
出力形式（JSONのみ）：{"judgment":"A or B or C or D","summary":"強みの要約80文字以内","strength":"強み詳細100文字以内","caution":"注意点80文字以内（なければ空文字）","action":"採用後にやること100文字以内","interview_questions":["面接質問1","面接質問2"]}
判定基準：A判定=5軸平均75点以上かつ誠実性70点以上かつストレス耐性60点以上、B判定=5軸平均60点以上、C判定=誠実性or適応力50点未満、D判定=5軸平均40点未満or誠実性35点未満orストレス耐性30点未満`,
            messages: [{ role: 'user', content: `候補者名: ${candidateName || '(未入力)'}\n協調性: ${scores.agreeableness}/100\n誠実性: ${scores.conscientiousness}/100\n適応力: ${scores.adaptability}/100\n積極性: ${scores.proactivity}/100\nストレス耐性: ${scores.stressTolerance}/100\n業種適性: ${industryScore ?? '(未測定)'}/100` }],
          }),
        });
        if (aiRes.ok) {
          const aiData = await aiRes.json();
          const text = aiData.content?.[0]?.text ?? '';
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            aiComment = JSON.parse(jsonMatch[0]);
            await supabase.from('test_results').update({ ai_comment: aiComment }).eq('id', id);
          }
        }
      }

      // メール送信
      if (process.env.RESEND_API_KEY) {
        await sendResultNotification({
          adminEmail: company.admin_email,
          candidateName: candidateName || '(氏名未入力)',
          scores: scores as Scores,
          judgment: getJudgment(scores as Scores),
          resultUrl: `${origin}/result?id=${id}`,
          aiComment,
        });
      }
    } catch (err) {
      console.error('AI analysis / Email error:', err);
    }
  }

  return NextResponse.json({ success: true, id });
}
