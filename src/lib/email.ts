import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
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
}

export async function sendResultNotification(params: NotificationParams) {
  const { adminEmail, candidateName, scores, judgment, resultUrl } = params;
  const avg = Math.round(
    (scores.agreeableness + scores.conscientiousness + scores.adaptability + scores.proactivity) / 4
  );

  const judgmentLabel: Record<string, string> = {
    A: 'A - 推奨', B: 'B - 良好', C: 'C - 要確認', D: 'D - 注意',
  };

  const resend = getResend();
  if (!resend) return;

  await resend.emails.send({
    from: 'Hana <onboarding@resend.dev>',
    to: adminEmail,
    subject: `[Hana] 新しいテスト結果: ${candidateName || '(氏名未入力)'}`,
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
            <span style="font-weight: bold; color: #1D9E75;">${judgmentLabel[judgment] ?? judgment}</span>
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
        <a href="${resultUrl}" style="display: block; text-align: center; background: #1D9E75; color: white; padding: 14px; border-radius: 10px; text-decoration: none; font-weight: bold;">詳細結果・AI分析を見る</a>
        <p style="text-align: center; color: #aaa; font-size: 11px; margin-top: 24px;">Hana - Pre-hire Aptitude Test</p>
      </div>
    `,
  });
}
