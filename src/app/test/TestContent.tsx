'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { questions, type Language } from '@/lib/questions';
import { UI_TEXT } from '@/lib/i18n';
import { calculateScores, generateResultId, type TestResult } from '@/lib/scoring';

// シード付きシャッフル（同一セッション内で固定順序を保証）
// Mulberry32 PRNG（偏りの少ない32bit乱数生成器）
function seededShuffle<T>(arr: T[], seed: number): { item: T; originalIndex: number }[] {
  const indexed = arr.map((item, i) => ({ item, originalIndex: i }));
  let s = seed | 0;
  const next = () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  // Fisher-Yates shuffle
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  return indexed;
}

export default function TestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') ?? 'ja') as Language;
  const candidateName = searchParams.get('name') ?? '';
  const companyCode = searchParams.get('code') ?? '';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  // クライアントサイドのみで実行されるため Math.random() でOK
  const [shuffleSeed] = useState(() => Math.floor(Math.random() * 100000));
  const shuffledChoicesMap = useMemo(() => {
    const map: Record<number, { item: (typeof questions)[0]['choices'][0]; originalIndex: number }[]> = {};
    for (const q of questions) {
      map[q.id] = seededShuffle([...q.choices], shuffleSeed + q.id);
    }
    return map;
  }, [shuffleSeed]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex) / totalQuestions) * 100;
  const shuffledChoices = shuffledChoicesMap[currentQuestion.id];

  const handleChoiceSelect = useCallback((displayIndex: number) => {
    setSelectedChoice(displayIndex);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedChoice === null) return;

    const originalIndex = shuffledChoices[selectedChoice].originalIndex;
    const newAnswers = { ...answers, [currentQuestion.id]: originalIndex };
    setAnswers(newAnswers);
    setSelectedChoice(null);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const scores = calculateScores(newAnswers);
      const resultId = generateResultId();

      const result: TestResult = {
        id: resultId,
        candidateName,
        companyCode,
        language: lang,
        answers: newAnswers,
        scores,
        referenceAnswers: {
          q10: questions[9].choices[newAnswers[10] ?? 0]?.label[lang] ?? '',
          q15: questions[14].choices[newAnswers[15] ?? 0]?.label[lang] ?? '',
          q20: questions[19].choices[newAnswers[20] ?? 0]?.label[lang] ?? '',
        },
        completedAt: new Date().toISOString(),
      };

      // Supabase に保存（失敗時はlocalStorageフォールバック）
      fetch('/api/submit-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      }).catch(() => {
        const existing = JSON.parse(localStorage.getItem('hana-results') ?? '[]');
        existing.push(result);
        localStorage.setItem('hana-results', JSON.stringify(existing));
      });

      router.push(`/complete?lang=${lang}&id=${resultId}`);
    }
  }, [selectedChoice, shuffledChoices, answers, currentQuestion, currentIndex, totalQuestions, candidateName, companyCode, lang, router]);

  const choiceLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-4 py-6">
      {/* プログレスバー */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#0F1F3D]">
            {UI_TEXT.question[lang]} {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1D9E75] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 質問 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <p className="text-lg font-medium text-[#0F1F3D] leading-relaxed">
          {currentQuestion.text[lang]}
        </p>
      </div>

      {/* 選択肢（ランダム順） */}
      <div className="space-y-3 flex-1">
        {shuffledChoices.map((entry, displayIndex) => (
          <button
            key={entry.originalIndex}
            onClick={() => handleChoiceSelect(displayIndex)}
            className={`w-full flex items-start gap-3 px-4 py-4 rounded-xl border-2 transition-all text-left active:scale-[0.98] ${
              selectedChoice === displayIndex
                ? 'border-[#1D9E75] bg-green-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                selectedChoice === displayIndex
                  ? 'bg-[#1D9E75] text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {choiceLabels[displayIndex]}
            </span>
            <span className="text-base text-gray-800 leading-relaxed pt-0.5">
              {entry.item.label[lang]}
            </span>
          </button>
        ))}
      </div>

      {/* 次へボタン */}
      <div className="mt-6 pb-4">
        <button
          onClick={handleNext}
          disabled={selectedChoice === null}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            selectedChoice !== null
              ? 'bg-[#1D9E75] hover:bg-[#178a66] text-white shadow-sm active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {currentIndex < totalQuestions - 1
            ? UI_TEXT.next[lang]
            : '✓'}
        </button>
      </div>
    </div>
  );
}
