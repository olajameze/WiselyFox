/** Supported learner age bands through young adulthood (23) */
export const AGE_BANDS = ["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"] as const;

export type AgeBand = (typeof AGE_BANDS)[number];

export const AGE_BAND_LABELS: Record<AgeBand, string> = {
  "5-7": "Ages 5 to 7",
  "8-10": "Ages 8 to 10",
  "11-13": "Ages 11 to 13",
  "14-16": "Ages 14 to 16",
  "17-19": "Ages 17 to 19 (college prep)",
  "20-23": "Ages 20 to 23 (young adult)",
};

export function isAgeBand(value: string): value is AgeBand {
  return (AGE_BANDS as readonly string[]).includes(value);
}

export function ageBandProximity(childBand: string, contentBand: string): number {
  const i = AGE_BANDS.indexOf(childBand as AgeBand);
  const j = AGE_BANDS.indexOf(contentBand as AgeBand);
  if (i === -1 || j === -1) return 99;
  return Math.abs(i - j);
}

/** Pick quiz/lesson content bands: exact match first, then nearest */
export function quizBandPriority(childBand: string): string[] {
  if (!isAgeBand(childBand)) return [...AGE_BANDS];
  const idx = AGE_BANDS.indexOf(childBand);
  const ordered = [childBand];
  for (let d = 1; d < AGE_BANDS.length; d++) {
    if (idx - d >= 0) ordered.push(AGE_BANDS[idx - d]);
    if (idx + d < AGE_BANDS.length) ordered.push(AGE_BANDS[idx + d]);
  }
  return ordered;
}
