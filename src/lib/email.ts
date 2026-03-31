import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

interface AiComment {
  judgment: string;
  summary: string;
  strength: string;
  caution: string;
  action: string;
  interview_questions: string[];
}

interface NotificationParams {
  adminEmail: string;
  candidateName: string;
  scores: {
    agreeableness: number;
    conscientiousness: number;
    adaptability: number;
    proactivity: number;
  };
  judgment: string;
  resultUrl: string;
  aiComment?: AiComment | null;
}

export async function sendResultNotification(params: NotificationParams) {
  const { adminEmail, candidateName, scores, judgment, resultUrl, aiComment } = params;
  const avg = Math.round(
    (scores.agreeableness + scores.conscientiousness + scores.adaptability + scores.proactivity) / 4
  );

  const judgmentLabel: Record<string, string> = {
    A: 'A - 推奨', B: 'B - 良好', C: 'C - 要確認', D: 'D - 注意',
  };

  const finalJudgment = aiComment?.judgment || judgment;

  // AI分析セクション
  const aiSection = aiComment ? `
        <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
          <h3 style="color: #0F1F3D; font-size: 14px; margin: 0 0 12px; border-bottom: 2px solid #1D9E75; padding-bottom: 8px;">AI分析レポート</h3>
          <div style="margin-bottom: 10px;">
            <p style="color: #888; font-size: 11px; margin: 0 0 2px;">総合評価</p>
            <p style="color: #0F1F3D; font-size: 14px; font-weight: bold; margin: 0;">${aiComment.summary}</p>
          </div>
          <div style="margin-bottom: 10px;">
            <p style="color: #888; font-size: 11px; margin: 0 0 2px;">強み</p>
            <p style="color: #333; font-size: 13px; margin: 0;">${aiComment.strength}</p>
          </div>
          ${aiComment.caution ? `
          <div style="margin-bottom: 10px;">
            <p style="color: #888; font-size: 11px; margin: 0 0 2px;">注意点</p>
            <p style="color: #b8860b; font-size: 13px; margin: 0;">${aiComment.caution}</p>
          </div>` : ''}
          <div style="margin-bottom: 10px;">
            <p style="color: #888; font-size: 11px; margin: 0 0 2px;">採用後のアクション</p>
            <p style="color: #333; font-size: 13px; margin: 0;">${aiComment.action}</p>
          </div>
          ${aiComment.interview_questions?.length > 0 ? `
          <div>
            <p style="color: #888; font-size: 11px; margin: 0 0 4px;">面接質問候補</p>
            ${aiComment.interview_questions.map(q => `<p style="color: #333; font-size: 13px; margin: 2px 0; padding-left: 12px;">・${q}</p>`).join('')}
          </div>` : ''}
        </div>` : '';

  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: 'Hana <onboarding@resend.dev>',
    to: adminEmail,
    subject: `[Hana] テスト結果: ${candidateName || '(氏名未入力)'} - 判定${finalJudgment}`,
    html: `
      <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="display: inline-block; background: #1D9E75; color: white; width: 48px; height: 48px; border-radius: 12px; line-height: 48px; font-size: 20px; font-weight: bold;">H</div>
          <h2 style="color: #0F1F3D; margin: 8px 0 0;">Hana テスト結果通知</h2>
        </div>
        <div style="background: #f8faf9; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
          <p style="margin: 0 0 8px; color: #666; font-size: 13px;">候補者名</p>
          <p style="margin: 0 0 16px; font-size: 18px; font-weight: bold; color: #0F1F3D;">${candidateName || '(氏名未入力)'}</p>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="color: #666; font-size: 13px;">判定</span>
            <span style="font-weight: bold; color: #1D9E75;">${judgmentLabel[finalJudgment] ?? finalJudgment}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="color: #666; font-size: 13px;">総合スコア</span>
            <span style="font-weight: bold; color: #1D9E75;">${avg} / 100</span>
          </div>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 12px 0;">
          <div style="font-size: 13px; color: #666;">
            <div style="display: flex; justify-content: space-between; margin: 4px 0;"><span>協調性</span><span style="font-weight:bold;color:#0F1F3D;">${scores.agreeableness}</span></div>
            <div style="display: flex; justify-content: space-between; margin: 4px 0;"><span>誠実性</span><span style="font-weight:bold;color:#0F1F3D;">${scores.conscientiousness}</span></div>
            <div style="display: flex; justify-content: space-between; margin: 4px 0;"><span>適応力</span><span style="font-weight:bold;color:#0F1F3D;">${scores.adaptability}</span></div>
            <div style="display: flex; justify-content: space-between; margin: 4px 0;"><span>積極性</span><span style="font-weight:bold;color:#0F1F3D;">${scores.proactivity}</span></div>
          </div>
        </div>
        ${aiSection}
        <a href="${resultUrl}" style="display: block; text-align: center; background: #1D9E75; color: white; padding: 14px; border-radius: 10px; text-decoration: none; font-weight: bold;">詳細結果を見る</a>
        <p style="text-align: center; color: #aaa; font-size: 11px; margin-top: 24px;">Hana - Pre-hire Aptitude Test</p>
      </div>
    `,
  });
}
