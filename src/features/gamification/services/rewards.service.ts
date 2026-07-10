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
