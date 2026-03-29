'use client';

import dynamic from 'next/dynamic';

const TestContent = dynamic(() => import('./TestContent'), { ssr: false });

export default function TestPage() {
  return <TestContent />;
}
