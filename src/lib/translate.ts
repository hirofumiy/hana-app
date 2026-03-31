// Claude API を使った多言語翻訳モジュール

const LANGUAGE_NAMES: Record<string, string> = {
  vi: 'Vietnamese',
  zh: 'Simplified Chinese',
  tl: 'Tagalog (Filipino)',
  id: 'Bahasa Indonesia',
  ne: 'Nepali',
  th: 'Thai',
  ja: 'Japanese',
};

const CATEGORY_CONTEXT: Record<string, string> = {
  shift_change: 'This is a shift/schedule change notification. Use clear, factual language about dates, times, and locations.',
  work_instruction: 'This is a work instruction or task assignment. Use clear, direct language. Include safety terms if relevant.',
  encouragement: 'This is an encouraging/motivational message from supervisor. Keep a warm, supportive tone.',
  general: 'This is a general workplace announcement.',
  report: 'This is a daily work report from a staff member. Translate naturally into Japanese business style.',
};

interface TranslateOptions {
  text: string;
  targetLanguages: string[];
  context?: 'notification' | 'report';
  category?: string;
}

interface TranslationResult {
  translations: Record<string, string>;
}

export async function translateText(options: TranslateOptions): Promise<TranslationResult> {
  const { text, targetLanguages, context = 'notification', category = 'general' } = options;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }

  const langList = targetLanguages
    .map(code => `"${code}": "${LANGUAGE_NAMES[code] || code}"`)
    .join(', ');

  const categoryHint = CATEGORY_CONTEXT[category] || CATEGORY_CONTEXT.general;

  const systemPrompt = context === 'report'
    ? `あなたは外国人スタッフの日報を日本語に翻訳するプロの翻訳者です。
ルール：
- 原文のニュアンスを保ちつつ、日本語のビジネス文書として自然な表現にする
- 固有名詞・数字はそのまま保持する
- JSONで出力：各言語コードをキーに翻訳文を値とする
出力形式：{"ja": "翻訳文"}`
    : `You are a professional translator for workplace communications between Japanese supervisors and foreign staff.
Rules:
- Translate the Japanese text into each requested language
- Use polite but clear language appropriate for workplace communication
- Preserve numbers, dates, times, and proper nouns exactly
- ${categoryHint}
- Return ONLY a JSON object with language codes as keys and translated text as values
Target languages: {${langList}}
Output format: {"vi": "...", "zh": "...", ...}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: text }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Translation API error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const responseText = data.content?.[0]?.text ?? '';
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error('Failed to parse translation response');
  }

  const translations = JSON.parse(jsonMatch[0]);
  return { translations };
}
