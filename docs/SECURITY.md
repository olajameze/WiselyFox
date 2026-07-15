# Security

## Headers

- CSP configured in `next.config.ts`
- HTTPS required in production

## Auth

- bcrypt password hashing (cost 12)
- Child PIN hashed, never stored plain
- In-memory sliding-window rate limits on parent sign-up, parent sign-in, and child PIN actions (`rate-limit.service.ts`: 10 attempts / 15 minutes per IP + identifier). Note: resets per server instance; not a distributed limiter.

## Monitoring

- Sentry DSN is optional via `SENTRY_DSN`. Full Sentry SDK wiring is deferred until a DSN is configured.
- Audit logs for admin actions and sensitive operations

## Bot / abuse signals

- Disposable-email screening on parent sign-up (`fraud-detection.service.ts`)
- Cloudflare Turnstile on sign-up is deferred (env keys accepted; widget not wired yet)

## Secrets

Never commit `.env`. Rotate `AUTH_SECRET` and `CRON_SECRET` for production.

## Tutor marketplace

- Tutors use optional `TutorProfile` (no separate role); tutor-only users cannot access `/parent`
- `requireParentOwner()` gates household dashboards, billing, consent, and child management
- Tutor progress access via `TutorStudentAccess` only, allowlist DTO, no `ChildProfile` PII
- Profile photos: max 2MB, JPEG/PNG/WebP; stored in Vercel Blob (`BLOB_READ_WRITE_TOKEN`) or `public/tutor-photos/` in dev
- Age verification: DOB required (18+), admin approval before publish
- Stripe Connect Express for tutor payouts; 5% `application_fee_amount` on payments and deposits
- Audit: tutor signup, access grant/revoke, bookings, admin verification actions
