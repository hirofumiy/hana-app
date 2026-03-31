import { NextResponse } from 'next/server';
import { createAuthClient, createServiceClient } from '@/lib/supabase/server';
import { translateText } from '@/lib/translate';

// 通知一覧取得
export async function GET() {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('admin_user_id', user.id)
    .single();

  if (!company) return NextResponse.json({ error: 'Company not found' }, { status: 404 });

  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('company_id', company.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 配信ステータスの集計
  const notifIds = (notifications ?? []).map(n => n.id);
  let deliverySummary: Record<string, { total: number; sent: number; read: number }> = {};

  if (notifIds.length > 0) {
    const service = createServiceClient();
    const { data: deliveries } = await service
      .from('notification_deliveries')
      .select('notification_id, status')
      .in('notification_id', notifIds);

    for (const d of deliveries ?? []) {
      if (!deliverySummary[d.notification_id]) {
        deliverySummary[d.notification_id] = { total: 0, sent: 0, read: 0 };
      }
      deliverySummary[d.notification_id].total++;
      if (d.status === 'sent' || d.status === 'delivered' || d.status === 'read') {
        deliverySummary[d.notification_id].sent++;
      }
      if (d.status === 'read') {
        deliverySummary[d.notification_id].read++;
      }
    }
  }

  return NextResponse.json({
    notifications: (notifications ?? []).map(n => ({
      ...n,
      delivery: deliverySummary[n.id] || { total: 0, sent: 0, read: 0 },
    })),
  });
}

// 通知作成 → 翻訳 → 配信
export async function POST(request: Request) {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('admin_user_id', user.id)
    .single();

  if (!company) return NextResponse.json({ error: 'Company not found' }, { status: 404 });

  const body = await request.json();
  const { subject_ja, body_ja, category = 'general', staff_ids, channels = ['email'] } = body;

  if (!subject_ja || !body_ja || !staff_ids?.length) {
    return NextResponse.json({ error: 'Subject, body, and recipients are required' }, { status: 400 });
  }

  const service = createServiceClient();

  // 1. 通知レコード作成
  const { data: notification, error: insertError } = await service
    .from('notifications')
    .insert({
      company_id: company.id,
      created_by: user.id,
      category,
      subject_ja,
      body_ja,
      delivery_channels: channels,
      target_staff_ids: staff_ids,
      translation_status: 'processing',
    })
    .select()
    .single();

  if (insertError || !notification) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }

  // 2. 対象スタッフの言語を取得
  const { data: staffList } = await service
    .from('staff')
    .select('id, name, language, email')
    .in('id', staff_ids)
    .eq('is_active', true);

  if (!staffList?.length) {
    return NextResponse.json({ error: 'No active staff found' }, { status: 400 });
  }

  // 3. 必要な言語を特定して翻訳
  const uniqueLanguages = [...new Set(staffList.map(s => s.language))].filter(l => l !== 'ja');
  let translations: Record<string, string> = {};

  if (uniqueLanguages.length > 0) {
    try {
      const fullText = `件名: ${subject_ja}\n\n${body_ja}`;
      const result = await translateText({
        text: fullText,
        targetLanguages: uniqueLanguages,
        context: 'notification',
        category,
      });
      translations = result.translations;

      await service
        .from('notifications')
        .update({ translations, translation_status: 'completed' })
        .eq('id', notification.id);
    } catch (err) {
      console.error('Translation error:', err);
      await service
        .from('notifications')
        .update({ translation_status: 'failed' })
        .eq('id', notification.id);
    }
  } else {
    await service
      .from('notifications')
      .update({ translation_status: 'completed' })
      .eq('id', notification.id);
  }

  // 4. 配信レコード作成 & メール送信
  const { Resend } = await import('resend');
  const resendKey = process.env.RESEND_API_KEY;
  const resend = resendKey ? new Resend(resendKey) : null;

  for (const staff of staffList) {
    for (const channel of channels) {
      const deliveryRow = {
        notification_id: notification.id,
        staff_id: staff.id,
        channel,
        status: 'pending' as string,
        sent_at: null as string | null,
        error_message: null as string | null,
      };

      if (channel === 'email' && staff.email && resend) {
        try {
          const translatedText = translations[staff.language] || `${subject_ja}\n\n${body_ja}`;

          await resend.emails.send({
            from: 'Hana <onboarding@resend.dev>',
            to: staff.email,
            subject: `[Hana] ${subject_ja}`,
            html: `
              <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
                <div style="background: #1D9E75; color: white; padding: 16px; border-radius: 12px 12px 0 0; text-align: center;">
                  <strong>Hana</strong>
                </div>
                <div style="background: #f8faf9; padding: 20px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0;">
                  <div style="white-space: pre-wrap; font-size: 15px; line-height: 1.7; color: #333;">
${translatedText}
                  </div>
                  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;">
                  <p style="font-size: 12px; color: #999; text-align: center;">
                    日本語原文 / Original Japanese:<br>
                    <span style="color: #666;">${subject_ja}</span><br>
                    <span style="color: #888; font-size: 11px;">${body_ja}</span>
                  </p>
                </div>
              </div>`,
          });
          deliveryRow.status = 'sent';
          deliveryRow.sent_at = new Date().toISOString();
        } catch (err) {
          deliveryRow.status = 'failed';
          deliveryRow.error_message = err instanceof Error ? err.message : String(err);
        }
      }
      // LINE配信は今後追加

      await service.from('notification_deliveries').insert(deliveryRow);
    }
  }

  return NextResponse.json({
    success: true,
    id: notification.id,
    translationStatus: translations ? 'completed' : 'failed',
    deliveryCount: staffList.length,
  });
}
