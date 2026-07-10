# Deployment

## Vercel

1. Connect repository
2. Set environment variables from `.env.example`
3. Set `DATABASE_URL` to a hosted **PostgreSQL** connection string (Neon, Supabase, Vercel Postgres, RDS, etc.)
4. Build command (default `npm run build`) runs `prisma migrate deploy` before `next build`

## Database migrations

Initial schema lives in `prisma/migrations/20250707120000_init/`.

| Environment | Command |
|-------------|---------|
| Local (Docker Postgres) | `docker compose up -d postgres` then `npm run db:migrate:deploy` |
| Production / CI | `npm run db:migrate:deploy` (included in `npm run build`) |
| New schema changes (dev) | `npm run db:migrate` |

After first deploy or local migrate, run `npm run db:seed` once to load curriculum and demo accounts.

## Super admin (production)

Set `SUPERADMIN_EMAILS` to comma-separated parent account emails that should receive super-admin access:

```env
SUPERADMIN_EMAILS="you@yourdomain.com,ops@yourdomain.com"
```

Matching accounts are promoted on sign-up/sign-in and the change is audit-logged. Keep the seeded `admin@wiselyfox.test` for local dev only.

## Support contacts (production)

```env
SUPPORT_EMAIL="support@yourdomain.com"
PILOT_COORDINATOR_EMAIL="pilot@yourdomain.com"
PILOT_FEEDBACK_URL="https://forms.example.com/wiselyfox-pilot"
```

Shown on `/support`, `/privacy`, and parent Settings.

## Cron

Configure Vercel Cron for `/api/cron/trial-reminders` with `Authorization: Bearer $CRON_SECRET`.

## Stripe webhooks

Point to `/api/webhooks/stripe` with signing secret in `STRIPE_WEBHOOK_SECRET`.
