import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

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
