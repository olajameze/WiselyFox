export type DiagnosticRecord = {
  skillSlug: string;
  masteryScore: number;
};

export type DiagnosticAnalytics = {
  overallMastery: number;
  errorBoundary: number;
  troubleSpots: string[];
  bySubject: Array<{
    subject: string;
    mastery: number;
    deviation: number;
  }>;
};

export function calculateDiagnosticAnalytics(records: DiagnosticRecord[]): DiagnosticAnalytics {
  const grouped = new Map<string, number[]>();

  for (const record of records) {
    const subject = record.skillSlug.split(":")[0] ?? record.skillSlug;
    const list = grouped.get(subject) ?? [];
    list.push(record.masteryScore);
    grouped.set(subject, list);
  }

  const bySubject = Array.from(grouped.entries()).map(([subject, values]) => {
    const mastery = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    const deviation = Math.max(0, 100 - mastery);
    return { subject, mastery, deviation };
  });

  const overallMastery = Math.round(
    records.reduce((sum, record) => sum + record.masteryScore, 0) / Math.max(records.length, 1),
  );

  const troubleSpots = bySubject
    .filter((subject) => subject.mastery < 50 || subject.deviation >= 35)
    .map((subject) => subject.subject);

  const errorBoundary = Math.max(5, Math.min(30, Math.ceil((100 - overallMastery) / 2)));

  return {
    overallMastery,
    errorBoundary,
    troubleSpots,
    bySubject,
  };
}
