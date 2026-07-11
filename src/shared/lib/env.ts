import { z } from "zod";

function emptyToUndefined(value: unknown): unknown {
  if (value === "" || value === undefined) return undefined;
  return value;
}

const optionalString = z.preprocess(emptyToUndefined, z.string().optional());
const optionalEmail = z.preprocess(emptyToUndefined, z.string().email().optional());
const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(16),
  AUTH_URL: optionalUrl,
  RESEND_API_KEY: optionalString,
  EMAIL_FROM: optionalString,
  STRIPE_SECRET_KEY: optionalString,
  STRIPE_WEBHOOK_SECRET: optionalString,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: optionalString,
  TRIAL_PERIOD_DAYS: z.coerce.number().default(14),
  CRON_SECRET: optionalString,
  SUPERADMIN_EMAILS: optionalString,
  INSIGHTS_MIN_COHORT: z.coerce.number().default(30),
  OPENAI_API_KEY: optionalString,
  OPENAI_MODEL: z.string().default("gpt-4o-mini"),
  TURNSTILE_SECRET_KEY: optionalString,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: optionalString,
  SENTRY_DSN: optionalString,
  SUPPORT_EMAIL: optionalEmail,
  PILOT_COORDINATOR_EMAIL: optionalEmail,
  PILOT_FEEDBACK_URL: optionalUrl,
  TUTOR_PLATFORM_FEE_BPS: z.coerce.number().default(500),
  BLOB_READ_WRITE_TOKEN: optionalString,
  VAPID_PUBLIC_KEY: optionalString,
  VAPID_PRIVATE_KEY: optionalString,
  VAPID_SUBJECT: optionalString,
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: optionalString,
  NEXT_PUBLIC_ENABLE_PWA_DEV: optionalString,
});

export type Env = z.infer<typeof envSchema>;

function getEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Invalid environment: ${message}`);
  }
  return parsed.data;
}

export const env = getEnv();

export function parseEmailList(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getSuperAdminEmails(): string[] {
  return parseEmailList(env.SUPERADMIN_EMAILS);
}
