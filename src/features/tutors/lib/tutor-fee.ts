import { TUTOR_FEE_BPS } from "@/features/tutors/lib/tutor-consent";

export function calculatePlatformFee(amountPence: number, feeBps = TUTOR_FEE_BPS): number {
  if (amountPence <= 0) return 0;
  return Math.round((amountPence * feeBps) / 10000);
}

export function calculateTutorPayout(amountPence: number, feeBps = TUTOR_FEE_BPS): number {
  return amountPence - calculatePlatformFee(amountPence, feeBps);
}

export function formatPence(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}
