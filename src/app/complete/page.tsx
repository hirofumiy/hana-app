'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { UI_TEXT } from '@/lib/i18n';
import type { Language } from '@/lib/questions';

function CompleteContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get('lang') ?? 'ja') as Language;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#1D9E75]/10 mb-6">
          <svg className="w-12 h-12 text-[#1D9E75]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#0F1F3D] mb-3">
          {UI_TEXT.thankYou[lang]}
        </h1>

        <p className="text-gray-600 leading-relaxed">
          {UI_TEXT.testComplete[lang]}
        </p>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="inline-flex items-center gap-2 text-[#1D9E75]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="text-sm font-medium">Hana</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense>
      <CompleteContent />
    </Suspense>
  );
}
