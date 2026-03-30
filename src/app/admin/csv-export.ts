import type { Scores } from '@/lib/scoring';

interface ResultRow {
  id: string;
  candidate_name: string;
  scores: Scores;
  completed_at: string;
  language: string;
}

export function exportCsv(results: ResultRow[], companyCode: string) {
  const headers = ['候補者名', '受験日', '言語', '協調性', '誠実性', '適応力', '積極性', '平均', '判定', 'Result ID'];
  const rows = results.map((r) => {
    const avg = Math.round(
      (r.scores.agreeableness + r.scores.conscientiousness + r.scores.adaptability + r.scores.proactivity) / 4
    );
    let judgment = 'C';
    if (r.scores.conscientiousness < 40 || avg < 50) judgment = 'D';
    else if (r.scores.conscientiousness < 55 || r.scores.adaptability < 55) judgment = 'C';
    else if (avg >= 75 && r.scores.conscientiousness >= 70) judgment = 'A';
    else if (avg >= 60) judgment = 'B';

    return [
      r.candidate_name || '(未入力)',
      new Date(r.completed_at).toLocaleDateString('ja-JP'),
      r.language.toUpperCase(),
      r.scores.agreeableness,
      r.scores.conscientiousness,
      r.scores.adaptability,
      r.scores.proactivity,
      avg,
      judgment,
      r.id,
    ].join(',');
  });

  const csv = '\uFEFF' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hana-results-${companyCode}-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
