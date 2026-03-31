import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient, createAuthClient } from '@/lib/supabase/server';

// 受験者用: 会社コードから業種を取得
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) {
    return NextResponse.json({ industry: 'general' });
  }

  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from('companies')
      .select('industry')
      .eq('company_code', code)
      .single();

    return NextResponse.json({ industry: data?.industry || 'general' });
  } catch {
    return NextResponse.json({ industry: 'general' });
  }
}

// 管理者用: 業種を更新
export async function PUT(req: NextRequest) {
  try {
    // 認証チェック
    const authClient = await createAuthClient();
    const { data: { user } } = await authClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { industry } = await req.json();
    if (!industry) {
      return NextResponse.json({ error: 'Missing industry' }, { status: 400 });
    }

    // サービスロールでRLSバイパスして更新
    const supabase = createServiceClient();
    const { error } = await supabase
      .from('companies')
      .update({ industry })
      .eq('admin_user_id', user.id);

    if (error) {
      console.error('Industry update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, industry });
  } catch (err) {
    console.error('Industry PUT error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
