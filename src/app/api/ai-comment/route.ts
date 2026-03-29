import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, scores, q10, q20 } = await request.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is not configured' },
      { status: 500 }
    );
  }

  const systemPrompt = `あなたは外国人採用の専門家AIです。特性テストのスコアから採用担当者向けの日本語レポートをJSONで返してください。

ルール：
- 断定ではなく「〜の傾向があります」の表現を使う
- ネガティブ評価は「注意点」として記述（差別的表現・国籍への言及は絶対禁止）
- 採用担当者が具体的に動けるアクションを必ず含める
- 200〜250文字以内

出力形式（JSONのみ、前後の説明不要）：
{
  "judgment": "A or B or C or D",
  "summary": "強みの要約60文字以内",
  "strength": "強み詳細80文字以内",
  "caution": "注意点60文字以内（なければ空文字）",
  "action": "採用後にやること80文字以内",
  "interview_questions": ["面接質問1（30文字以内）", "面接質問2（30文字以内）"]
}

判定基準：
- A判定：4軸平均75点以上、誠実性70点以上
- B判定：4軸平均60点以上
- C判定：誠実性または適応力が55点未満
- D判定：4軸平均50点未満または誠実性40点未満`;

  const userPrompt = `候補者名: ${name || '(未入力)'}
協調性: ${scores.agreeableness}/100
誠実性: ${scores.conscientiousness}/100
適応力: ${scores.adaptability}/100
積極性: ${scores.proactivity}/100
前職退職理由（参考）: ${q10 || '(未回答)'}
期待（参考）: ${q20 || '(未回答)'}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [
          { role: 'user', content: userPrompt },
        ],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      return NextResponse.json({ error: 'API call failed' }, { status: 500 });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';

    // JSONを抽出してパース
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    const aiResult = JSON.parse(jsonMatch[0]);
    return NextResponse.json(aiResult);
  } catch (error) {
    console.error('AI comment error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
