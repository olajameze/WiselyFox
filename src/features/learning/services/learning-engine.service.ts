export function calculateMastery(
  current: number,
  correct: boolean,
  difficulty: number,
): number {
  const delta = correct ? 0.15 * difficulty : -0.08;
  return Math.min(1, Math.max(0, current + delta));
}

export function nextReviewDate(mastery: number): Date {
  const days = mastery < 0.4 ? 1 : mastery < 0.7 ? 3 : mastery < 0.9 ? 7 : 14;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

export function adjustDifficulty(mastery: number, current: number): number {
  if (mastery > 0.85) return Math.min(5, current + 1);
  if (mastery < 0.4) return Math.max(1, current - 1);
  return current;
}

import { quizBandPriority } from "@/data/age-bands";

export function pickQuestions<T extends { difficulty: number; ageBand: string }>(
  pool: T[],
  level: number,
  ageBand: string,
  count: number,
): T[] {
  const bands = quizBandPriority(ageBand);
  let filtered: T[] = [];

  for (const band of bands) {
    filtered = pool.filter(
      (q) => q.ageBand === band && Math.abs(q.difficulty - level) <= 1,
    );
    if (filtered.length >= count) break;
  }

  if (filtered.length < count) {
    filtered = pool.filter((q) => Math.abs(q.difficulty - level) <= 1);
  }
  if (filtered.length < count) {
    filtered = pool;
  }

  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
