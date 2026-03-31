import { NextResponse } from 'next/server';
import { createAuthClient } from '@/lib/supabase/server';

// スタッフ一覧取得
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

  const { data: staff, error } = await supabase
    .from('staff')
    .select('*')
    .eq('company_id', company.id)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ staff: staff ?? [] });
}

// スタッフ追加
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
  const { name, name_native, language, email, phone } = body;

  if (!name || !language) {
    return NextResponse.json({ error: 'Name and language are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('staff')
    .insert({
      company_id: company.id,
      name,
      name_native: name_native || null,
      language,
      email: email || null,
      phone: phone || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ staff: data });
}

// スタッフ更新
export async function PUT(request: Request) {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });

  const { data, error } = await supabase
    .from('staff')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ staff: data });
}

// スタッフ無効化
export async function DELETE(request: Request) {
  const supabase = await createAuthClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Staff ID is required' }, { status: 400 });

  const { error } = await supabase
    .from('staff')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
