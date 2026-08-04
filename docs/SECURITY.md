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
- Cloudflare Turnstile on the landing page waitlist is wired end-to-end (`turnstile.service.ts` server-side siteverify + `TurnstileWidget`). When `TURNSTILE_SECRET_KEY` is unset (local dev / preview) tokens bypass verification; in any environment with the secret set, missing/invalid tokens are rejected server-side before any DB write or Resend send.
- Per-IP + email rate limiting on the `waitlist` action (10 / 15 min) plus waitlist email deduplication via the unique `WaitlistLead.email` index.

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
