export function calculateXp(base: number, streak: number, perfect: boolean): number {
  let xp = base;
  if (perfect) xp += Math.round(base * 0.5);
  if (streak >= 3) xp += Math.round(base * 0.2);
  if (streak >= 7) xp += Math.round(base * 0.3);
  return xp;
}

export function calculateCoins(xp: number): number {
  return Math.floor(xp / 10);
}

export function shouldUnlockBadge(xp: number, threshold: number): boolean {
  return xp >= threshold;
}

/** 0 = same day, 1 = consecutive day, -1 = streak broken */
export function updateStreak(lastStudyDate: Date | null): number {
  if (!lastStudyDate) return 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last = new Date(lastStudyDate);
  last.setHours(0, 0, 0, 0);
  const diff = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
  if (diff === 0) return 0;
  if (diff === 1) return 1;
  return -1;
}

export function computeStudyRewards(input: {
  baseXp: number;
  currentStreak: number;
  lastStudyDate: Date | null;
  perfect?: boolean;
}): { xp: number; coins: number; streakDays: number } {
  const streakDelta = updateStreak(input.lastStudyDate);
  let streakDays = input.currentStreak;

  if (streakDelta === 1) {
    streakDays = input.currentStreak + 1;
  } else if (streakDelta === -1 || input.currentStreak === 0) {
    streakDays = 1;
  }

  const xp = calculateXp(input.baseXp, streakDays, input.perfect ?? false);
  return { xp, coins: calculateCoins(xp), streakDays };
}

export function getNextXpMilestone(currentXp: number, milestones: { xp: number }[]): number | null {
  const next = milestones.find((m) => m.xp > currentXp);
  return next?.xp ?? null;
}
