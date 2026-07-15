# Backlog

Items intentionally deferred from v1 / public paid launch:

- Stripe Checkout UI for parent subscriptions (requires live price IDs)
- Cloudflare Turnstile widget on sign-up (requires site keys)
- Sentry full SDK integration (requires DSN)
- OpenAI live generation in product flows (service exists with fallbacks; wire when API key and product surface are ready)
- Embedded Stripe Elements checkout UI for tutor bookings (PaymentIntent client secret returned; wire Elements when live keys available)

## Already shipped (do not re-list as deferred)

- Parent data export self-service UI (Settings → export JSON)
- PWA install prompt + optional Web Push plumbing (`public/sw.js`, VAPID env vars)
- Auth rate limiting on sign-up, parent sign-in, and child PIN (in-memory sliding window)
- Topic-accurate lesson videos from oEmbed-verified educational sources (`src/data/lesson-videos.ts`)
- Extended online subjects: psychology, philosophy, sociology, economics, astronomy
- Dedicated subject Videos page (`/learn/videos/[subjectSlug]`) separate from study guide text
- STEM subjects: AI, robotics, English, geometry, statistics, biology, chemistry, physics, computing, cybersecurity
- Age-matched lessons across bands (including 5–7 fills and STEM/extended depth pack)
- Study guide enrichments for STEM and extended subjects
- Daily study streak rewards at 5, 7, and 14 days (parent approval)

## Deferred (media)

- Automated CI oEmbed re-check of every YouTube ID (network-dependent; catalog is verified at authoring time)

## Tutor marketplace (implemented)

- Capability-based tutor profiles (no `TUTOR` role)
- Admin age/profile verification at `/admin/tutors`
- Parent directory at `/parent/tutors`
- Parent-controlled progress sharing + booking auto-share
- Stripe Connect tutor payouts with 5% platform fee (`TUTOR_PLATFORM_FEE_BPS`)
