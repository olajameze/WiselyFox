import { ageBandProximity, isAgeBand, AGE_BAND_LABELS, type AgeBand } from "@/data/age-bands";

export function parseSubjectAgeBands(ageBandsJson: string): string[] {
  try {
    const parsed = JSON.parse(ageBandsJson) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Subject is shown if the child's age band is listed or within one band step. */
export function subjectMatchesChildAge(subjectAgeBands: string[], childBand: string): boolean {
  if (!isAgeBand(childBand)) return true;
  if (subjectAgeBands.length === 0) return true;
  return subjectAgeBands.some((band) => ageBandProximity(childBand, band) <= 1);
}

export function filterContentForAge<T extends { ageBand: string }>(
  items: T[],
  childBand: string,
  maxProximity = 1,
): T[] {
  if (!isAgeBand(childBand)) return items;

  const sorted = [...items].sort(
    (a, b) =>
      ageBandProximity(childBand, a.ageBand) - ageBandProximity(childBand, b.ageBand) ||
      a.ageBand.localeCompare(b.ageBand),
  );

  const matched = sorted.filter((item) => ageBandProximity(childBand, item.ageBand) <= maxProximity);
  return matched.length > 0 ? matched : sorted.slice(0, Math.min(8, sorted.length));
}

export function countContentForAge<T extends { ageBand: string }>(
  items: T[],
  childBand: string,
  maxProximity = 1,
): number {
  return filterContentForAge(items, childBand, maxProximity).length;
}

export function ageBandLabel(childBand: string): string {
  return isAgeBand(childBand) ? AGE_BAND_LABELS[childBand as AgeBand] : childBand;
}
