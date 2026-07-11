import { prisma } from "@/shared/lib/prisma";
import { scoreAssessment, ASSESSMENT_QUESTIONS } from "./assessment.service";

export type AssessmentAnswer = {
  questionId: string;
  correct: boolean;
  responseTimeMs: number;
  confidence: number;
};

export type AssessmentDomainScore = {
  domain: string;
  correct: number;
  total: number;
};

export type ChildAssessmentRecord = {
  id: string;
  levelResult: string;
  score: number;
  avgConfidence: number;
  completedAt: Date;
  domainScores: AssessmentDomainScore[];
};

function parseAssessmentRecord(row: {
  id: string;
  responses: string;
  scores: string;
  levelResult: string;
  completedAt: Date;
}): ChildAssessmentRecord {
  const answers = JSON.parse(row.responses) as AssessmentAnswer[];
  const scores = JSON.parse(row.scores) as { score?: number; avgConfidence?: number };
  const scored = scoreAssessment(answers);

  const domainMap = new Map<string, { correct: number; total: number }>();
  for (const answer of answers) {
    const question = ASSESSMENT_QUESTIONS.find((q) => q.id === answer.questionId);
    const domain = question?.domain ?? "general";
    const entry = domainMap.get(domain) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (answer.correct) entry.correct += 1;
    domainMap.set(domain, entry);
  }

  return {
    id: row.id,
    levelResult: row.levelResult,
    score: scores.score ?? scored.score,
    avgConfidence: scores.avgConfidence ?? scored.avgConfidence,
    completedAt: row.completedAt,
    domainScores: Array.from(domainMap.entries()).map(([domain, stats]) => ({
      domain,
      ...stats,
    })),
  };
}

export async function getChildAssessmentHistory(childId: string): Promise<ChildAssessmentRecord[]> {
  const rows = await prisma.assessment.findMany({
    where: { childId },
    orderBy: { completedAt: "desc" },
  });
  return rows.map(parseAssessmentRecord);
}

export async function getLatestChildAssessment(
  childId: string,
): Promise<ChildAssessmentRecord | null> {
  const row = await prisma.assessment.findFirst({
    where: { childId },
    orderBy: { completedAt: "desc" },
  });
  return row ? parseAssessmentRecord(row) : null;
}

export function formatAssessmentDomain(domain: string): string {
  const labels: Record<string, string> = {
    reading: "Reading",
    maths: "Maths",
    logic: "Logic",
    memory: "Memory",
    attention: "Attention",
    general: "General",
  };
  return labels[domain] ?? domain;
}
