# Family pilot testing guide

WiselyFox is ready for **guided family beta testing**. Billing is disabled in pilot mode, no card, no Stripe charges.

## Quick start (local)

```bash
npm install
cp .env.example .env
# Set AUTH_SECRET to any random string (32+ chars recommended)

docker compose up -d postgres
npm run db:migrate:deploy
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo accounts (pre-seeded)

| Role | How to sign in | Credentials |
|------|----------------|-------------|
| **Parent** | [Sign in](http://localhost:3000/sign-in) | `parent@demo.wiselyfox.test` / `demo123456` |
| **Child** | [Child sign-in](http://localhost:3000/child-sign-in) | Access code `wfox-demo-alex` / PIN `1234` |
| **Admin** | [Sign in](http://localhost:3000/sign-in) | `admin@wiselyfox.test` / `admin123456` |

New families can also **create their own parent account** at `/sign-up`, no payment required during the pilot.

## Suggested test flow (30 to 45 minutes)

### Parent setup

1. Sign in as parent (demo or new account).
2. Complete onboarding if prompted, add a child profile.
3. Open **Children** → note the child's **access code** (share only with your learner).
4. Open **Schedule** for your child, review or edit the weekly learning plan.
5. Open **Accessibility**, try dyslexia friendly font, high contrast, calm colours, session length.
6. Open **Settings** → try **Upgrade to Family** (instant, no billing).
7. Open **Rewards**, approve the demo pending reward if using the demo child.

### Child learning

1. Sign out of parent account (sidebar **Account** menu).
2. Go to **Child sign-in** → enter access code + PIN.
3. On **Learn home**, check:
   - **Picked for you** (adaptive recommendations from assessment + mastery)
   - **Today's schedule** (parent-set items for today)
   - **Today's missions**
4. **Browse subjects** → complete a lesson (4 steps).
5. Take a **quiz**, perfect score may trigger a reward for parent approval.
6. Use **Focus timer**, duration matches accessibility session length.
7. Confirm accessibility toggles (set by parent) affect fonts/contrast on learn pages.

### Parent follow-up

1. Sign back in as parent.
2. **Progress**, weekly charts, mastery, adaptive picks per child.
3. **Notifications**, lesson completions, reward approvals.
4. **Settings** → **Export data** (JSON download).
5. Optional: **Delete account** on a throwaway test account only.

## What works in pilot mode

| Feature | Status |
|---------|--------|
| Parent & child dashboards | Ready |
| 6 lessons per subject (pilot curriculum) | Ready |
| Quizzes & study guides | Ready |
| Adaptive lesson recommendations | Ready |
| Parent reward approval | Ready |
| Weekly learning schedules | Ready |
| Plan upgrade/downgrade (no Stripe) | Ready |
| Accessibility settings → child UI | Ready |
| Data export | Ready |
| Account delete (cascade children) | Ready |

## What is NOT enabled yet

- **Real billing**, Stripe keys can stay empty; checkout is not required.
- **Transactional email**, Resend optional; password reset emails need `RESEND_API_KEY`.
- **Production database**, use hosted PostgreSQL (`DATABASE_URL`); local dev uses Docker Postgres (see README)
- **Full monitoring**, Sentry optional via `SENTRY_DSN`.

## Environment variables (pilot minimum)

```env
DATABASE_URL="postgresql://wiselyfox:wiselyfox@localhost:5433/wiselyfox"
AUTH_SECRET="your-random-secret-here"
AUTH_URL="http://localhost:3000"
```

Leave `STRIPE_*`, `RESEND_API_KEY`, `OPENAI_API_KEY`, and `SENTRY_DSN` empty for local family testing.

### Optional env vars (lines 19 to 30 in `.env.example`)

| Variable | Cost | Needed for pilot? |
|----------|------|-----------------|
| `CRON_SECRET` | Free (you generate it) | No, only for deployed cron jobs |
| `TURNSTILE_*` | Free (Cloudflare) | No, deferred (keys accepted; widget not wired yet) |
| `SENTRY_DSN` | Free tier available | No, optional error monitoring in prod |
| `SUPERADMIN_EMAILS` | Free | **Yes in production** — comma-separated emails promoted to admin on login |
| `INSIGHTS_MIN_COHORT` | Free (app setting) | No, defaults to 30 |
| `OPENAI_API_KEY` | **Paid** | **No**, curriculum is static; AI has fallbacks |

## Feedback to collect from families

- Can the child complete a lesson without help?
- Are schedule and rewards understandable?
- Do accessibility settings help your learner?
- Is progress data useful to parents?
- Any confusing steps in sign-up or child login?

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Database errors after update | Run `npm run db:migrate:deploy` then `npm run db:seed` |
| Child can't sign in | Confirm access code + PIN; check parent **Children** page |
| No adaptive picks | Complete entrance **Assessment** for the child |
| Rewards not appearing | Complete lessons/quizzes to earn XP milestones |
| Build fails on Windows with dev server running | Stop `npm run dev`, then `npm run build` |
| "Too many attempts" on sign-in or child PIN | Auth is rate limited (10 tries / 15 min). Wait a few minutes, or restart the dev server to clear the in-memory limiter. |

## Support contacts

| Channel | Contact |
|---------|---------|
| **General support & data requests** | `support@wiselyfox.app` (override with `SUPPORT_EMAIL` in `.env`) |
| **Family pilot coordinator** | `pilot@wiselyfox.app` (override with `PILOT_COORDINATOR_EMAIL`) |
| **In-app** | [/support](http://localhost:3000/support) |
| **Optional feedback form** | Set `PILOT_FEEDBACK_URL` in production `.env` |

Before sharing with real families, replace the default emails above with addresses you monitor daily.
