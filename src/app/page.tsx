'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LANGUAGES, type Language } from '@/lib/questions';
import { UI_TEXT } from '@/lib/i18n';
import { Suspense } from 'react';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Language | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [companyCode, setCompanyCode] = useState(searchParams.get('code') ?? '');

  const handleStart = () => {
    if (!lang) return;
    const params = new URLSearchParams({
      lang,
      name: candidateName,
      code: companyCode,
    });
    router.push(`/test?${params.toString()}`);
  };

  // 言語選択前
  if (!lang) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#1D9E75] mb-4">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#0F1F3D]">Hana</h1>
            <p className="text-sm text-gray-500 mt-1">Pre-hire Aptitude Test</p>
          </div>

          <p className="text-center text-gray-600 mb-6 text-lg">
            Select your language / 言語を選択
          </p>
          <div className="grid grid-cols-2 gap-3">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className="flex items-center gap-3 px-4 py-4 rounded-xl bg-white border-2 border-gray-200 hover:border-[#1D9E75] hover:bg-green-50 transition-all text-left shadow-sm active:scale-[0.98]"
              >
                <span className="text-2xl">{l.flag}</span>
                <span className="text-base font-medium text-gray-800">{l.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1D9E75] mb-3">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#0F1F3D]">Hana</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <p className="text-gray-600 text-sm leading-relaxed">
            {UI_TEXT.testDescription[lang]}
          </p>
          <p className="text-gray-500 text-sm">
            {UI_TEXT.estimatedTime[lang]}
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {UI_TEXT.candidateName[lang]}
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder={UI_TEXT.candidateNamePlaceholder[lang]}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/20 outline-none text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {UI_TEXT.companyCode[lang]}
            </label>
            <input
              type="text"
              value={companyCode}
              onChange={(e) => setCompanyCode(e.target.value)}
              placeholder={UI_TEXT.companyCodePlaceholder[lang]}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/20 outline-none text-base"
            />
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-[#1D9E75] hover:bg-[#178a66] text-white font-semibold text-lg transition-colors active:scale-[0.98] shadow-sm"
          >
            {UI_TEXT.startTest[lang]}
          </button>

          <button
            onClick={() => setLang(null)}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← {UI_TEXT.selectLanguage[lang]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
