'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { questions, type Language, type Question } from '@/lib/questions';
import { getIndustryQuestions, type IndustryQuestion } from '@/lib/industry-questions';
import { UI_TEXT } from '@/lib/i18n';
import { calculateScores, calculateIndustryScore, calculateConsistency, generateResultId, type TestResult } from '@/lib/scoring';

// 統合質問型（ベース + 業種別を同じインターフェースで扱う）
interface UnifiedQuestion {
  id: number;
  text: Record<Language, string>;
  choices: [{ label: Record<Language, string> }, { label: Record<Language, string> }, { label: Record<Language, string> }, { label: Record<Language, string> }];
}

// Mulberry32 PRNG シャッフル
function seededShuffle<T>(arr: T[], seed: number): { item: T; originalIndex: number }[] {
  const indexed = arr.map((item, i) => ({ item, originalIndex: i }));
  let s = seed | 0;
  const next = () => {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [industryQuestions, setIndustryQuestions] = useState<IndustryQuestion[]>([]);
  const [industryLoaded, setIndustryLoaded] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 会社の業種を取得して業種別質問をロード
  useEffect(() => {
    if (!companyCode) {
      setIndustryLoaded(true);
      return;
    }
    fetch(`/api/company-industry?code=${encodeURIComponent(companyCode)}`)
      .then(res => res.json())
      .then(data => {
        const iq = getIndustryQuestions(data.industry || 'general');
        setIndustryQuestions(iq);
      })
      .catch(() => {
        setIndustryQuestions(getIndustryQuestions('general'));
      })
      .finally(() => setIndustryLoaded(true));
  }, [companyCode]);

  // ベース15問 + 業種別5問 = 20問の統合リスト
  const allQuestions: UnifiedQuestion[] = useMemo(() => {
    const base: UnifiedQuestion[] = questions.map(q => ({
      id: q.id,
      text: q.text,
      choices: q.choices,
    }));
    const industry: UnifiedQuestion[] = industryQuestions.map(q => ({
      id: q.id,
      text: q.text,
      choices: q.choices,
    }));
    return [...base, ...industry];
  }, [industryQuestions]);

  const [shuffleSeed] = useState(() => Math.floor(Math.random() * 100000));
  const shuffledChoicesMap = useMemo(() => {
    const map: Record<number, { item: UnifiedQuestion['choices'][0]; originalIndex: number }[]> = {};
    for (const q of allQuestions) {
      map[q.id] = seededShuffle([...q.choices], shuffleSeed + q.id);
    }
    return map;
  }, [shuffleSeed, allQuestions]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  if (!industryLoaded) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[currentIndex];
  if (!currentQuestion) return null;

  const progress = ((currentIndex) / totalQuestions) * 100;
  const shuffledChoices = shuffledChoicesMap[currentQuestion.id];

  // 選択 → 即遷移（0.4秒のハイライト後に自動で次へ）
  const handleChoiceSelect = (displayIndex: number) => {
    if (isTransitioning || !shuffledChoices) return;

    setSelectedChoice(displayIndex);
    setIsTransitioning(true);

    transitionTimer.current = setTimeout(() => {
      const originalIndex = shuffledChoices[displayIndex].originalIndex;
      const newAnswers = { ...answers, [currentQuestion.id]: originalIndex };
      setAnswers(newAnswers);
      setSelectedChoice(null);
      setIsTransitioning(false);

      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // テスト完了
        const scores = calculateScores(newAnswers);
        const industryScore = calculateIndustryScore(newAnswers);
        const consistency = calculateConsistency(newAnswers);
        const resultId = generateResultId();

        const result: TestResult = {
          id: resultId,
          candidateName,
          companyCode,
          language: lang,
          answers: newAnswers,
          scores,
          industryScore,
          consistency,
          completedAt: new Date().toISOString(),
        };

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
    }, 400);
  };

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

      {/* 選択肢（ランダム順・選択即遷移） */}
      <div className="space-y-3 flex-1">
        {shuffledChoices?.map((entry, displayIndex) => (
          <button
            key={entry.originalIndex}
            onClick={() => handleChoiceSelect(displayIndex)}
            disabled={isTransitioning}
            className={`w-full flex items-start gap-3 px-4 py-4 rounded-xl border-2 transition-all text-left active:scale-[0.98] ${
              selectedChoice === displayIndex
                ? 'border-[#1D9E75] bg-green-50 shadow-sm scale-[0.98]'
                : isTransitioning
                  ? 'border-gray-100 bg-gray-50 opacity-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
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

      {/* 選択即遷移のため「次へ」ボタンは不要 */}
      <div className="mt-6 pb-4 text-center">
        <p className="text-xs text-gray-300">
          {isTransitioning ? '...' : '選択すると自動で次に進みます'}
        </p>
      </div>
    </div>
  );
}
