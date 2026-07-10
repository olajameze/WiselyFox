import type { ConsentRecord, ConsentType } from "@prisma/client";

export function getLatestConsent(
  consents: ConsentRecord[],
  type: ConsentType,
): ConsentRecord | undefined {
  return consents
    .filter((record) => record.type === type)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
}

export function isConsentGranted(
  consents: ConsentRecord[],
  type: ConsentType,
): boolean {
  return getLatestConsent(consents, type)?.granted ?? false;
}
