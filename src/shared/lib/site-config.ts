import { env } from "@/shared/lib/env";

const DEFAULT_SUPPORT_EMAIL = "support@wiselyfox.app";
const DEFAULT_PILOT_COORDINATOR = "pilot@wiselyfox.app";
const DEFAULT_SITE_URL = "https://wiselyfox.app";

/** Absolute site origin for metadata, sitemap, and canonical URLs. */
export function getSiteUrl(): string {
  const fromAuth = env.AUTH_URL?.trim();
  if (fromAuth) return fromAuth.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/\/$/, "");
    return host.startsWith("http") ? host : `https://${host}`;
  }

  return DEFAULT_SITE_URL;
}

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
