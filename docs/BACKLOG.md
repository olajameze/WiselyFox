# Backlog

Items intentionally deferred from v1:

- Stripe Checkout UI for parent subscriptions (requires live price IDs)
- Cloudflare Turnstile widget on sign-up (requires site keys)
- Sentry full integration (requires DSN)
- OpenAI live generation (requires API key)
- PWA service worker and Web Push
- Parent data export self-service UI

## Tutor marketplace (implemented)

- Capability-based tutor profiles (no `TUTOR` role)
- Admin age/profile verification at `/admin/tutors`
- Parent directory at `/parent/tutors`
- Parent-controlled progress sharing + booking auto-share
- Stripe Connect tutor payouts with 5% platform fee (`TUTOR_PLATFORM_FEE_BPS`)
- Deferred: embedded Stripe Elements checkout UI for tutor bookings (PaymentIntent client secret returned; wire Elements when live keys available)
