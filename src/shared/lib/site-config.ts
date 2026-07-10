import { env } from "@/shared/lib/env";

const DEFAULT_SUPPORT_EMAIL = "support@wiselyfox.app";
const DEFAULT_PILOT_COORDINATOR = "pilot@wiselyfox.app";

export function getSupportEmail(): string {
  return env.SUPPORT_EMAIL?.trim() || DEFAULT_SUPPORT_EMAIL;
}

export function getPilotCoordinatorEmail(): string {
  return env.PILOT_COORDINATOR_EMAIL?.trim() || getSupportEmail() || DEFAULT_PILOT_COORDINATOR;
}

export function getPilotFeedbackUrl(): string | null {
  const url = env.PILOT_FEEDBACK_URL?.trim();
  return url && url.length > 0 ? url : null;
}

export function getSupportMailto(subject?: string): string {
  const email = getSupportEmail();
  if (!subject) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
