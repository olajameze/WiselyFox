import { z } from "zod";

function emptyToUndefined(value: unknown): unknown {
  if (value === "" || value === undefined) return undefined;
  return value;
}

const optionalString = z.preprocess(emptyToUndefined, z.string().optional());
const optionalEmail = z.preprocess(emptyToUndefined, z.string().email().optional());
const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1)
    .refine((url) => !url.includes("db.example.com"), {
      message: "DATABASE_URL is still a placeholder — set it to a real PostgreSQL connection string",
    }),
  AUTH_SECRET: z.string().min(16),
  AUTH_URL: optionalUrl,
  RESEND_API_KEY: optionalString,
  EMAIL_FROM: optionalString,
  STRIPE_SECRET_KEY: optionalString,
  STRIPE_WEBHOOK_SECRET: optionalString,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: optionalString,
  STRIPE_PRICE_ESSENTIAL_MONTHLY: optionalString,
  STRIPE_PRICE_ESSENTIAL_ANNUAL: optionalString,
  STRIPE_PRICE_FAMILY_MONTHLY: optionalString,
  STRIPE_PRICE_FAMILY_ANNUAL: optionalString,
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
  AUTH_GOOGLE_ID: optionalString,
  AUTH_GOOGLE_SECRET: optionalString,
  GOOGLE_CLIENT_ID: optionalString,
  GOOGLE_CLIENT_SECRET: optionalString,
  AUTH_FACEBOOK_ID: optionalString,
  AUTH_FACEBOOK_SECRET: optionalString,
  FACEBOOK_CLIENT_ID: optionalString,
  FACEBOOK_CLIENT_SECRET: optionalString,
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

/**
 * Lazy environment access.
 *
 * Validation must NOT run at module import time: during `next build`, Vercel
 * imports every route to collect page data in an environment where runtime
 * secrets (e.g. DATABASE_URL) are not guaranteed to be present. Evaluating
 * lazily on first property access keeps the build green while still failing
 * fast at runtime if required variables are missing.
 */
let cachedEnv: Env | undefined;

export const env: Env = new Proxy({} as Env, {
  get(_target, prop: string | symbol) {
    if (!cachedEnv) cachedEnv = getEnv();
    return cachedEnv[prop as keyof Env];
  },
  has(_target, prop) {
    if (!cachedEnv) cachedEnv = getEnv();
    return prop in cachedEnv;
  },
  ownKeys() {
    if (!cachedEnv) cachedEnv = getEnv();
    return Reflect.ownKeys(cachedEnv);
  },
  getOwnPropertyDescriptor(_target, prop) {
    if (!cachedEnv) cachedEnv = getEnv();
    const descriptor = Reflect.getOwnPropertyDescriptor(cachedEnv, prop);
    if (descriptor) descriptor.configurable = true;
    return descriptor;
  },
});

export function parseEmailList(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getSuperAdminEmails(): string[] {
  return parseEmailList(env.SUPERADMIN_EMAILS);
}
