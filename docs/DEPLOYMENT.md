# Deployment

## Vercel

1. Connect repository
2. Set environment variables from `.env.example`
3. Set `DATABASE_URL` to a hosted **PostgreSQL** connection string (Neon, Supabase, Vercel Postgres, RDS, etc.)
4. Build command (default `npm run build`) runs `prisma migrate deploy` before `next build`

## Neon (production database)

Recommended production database. Setup:

1. Create a project at [neon.tech](https://neon.tech) (free tier is enough for the family pilot).
2. Neon gives you **two connection strings** per branch — use the right one in each place:

   | Where | Which string | Why |
   |-------|--------------|-----|
   | Vercel `DATABASE_URL` (app runtime) | **Pooled** string ending in `-pooler` | The app opens many short-lived connections from serverless functions; the pooler (PgBouncer) prevents connection-limit errors. |
   | Running migrations from your machine | **Direct** (non-pooled) string | `prisma migrate deploy` needs a direct connection; pooled endpoints can break statement-based migrations. |

3. Create the schema from your machine:

   ```powershell
   $env:DATABASE_URL = "postgresql://USER:PASSWORD@ep-xxx-xxx.REGION.aws.neon.tech/DBNAME?sslmode=require"
   npx prisma migrate deploy
   npm run db:seed   # optional: demo accounts + curriculum
   ```

4. Set the **pooled** string in Vercel → Settings → Environment Variables:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@ep-xxx-xxx-pooler.REGION.aws.neon.tech/DBNAME?sslmode=require"
   ```

   Note the `-pooler` host. Always include `?sslmode=require`.

5. Redeploy after changing variables. If sign-up/sign-in returns "could not create your account", check Vercel logs — a `Can't reach database server` error means `DATABASE_URL` is wrong or still a placeholder.

### Neon via Vercel integration (alternative)

Vercel → Storage → Marketplace → Neon → Connect creates the database and sets `DATABASE_URL` automatically. You may still need to expose the direct (non-pooled) URL as a separate variable (e.g. `DIRECT_DATABASE_URL`) for local migrations.

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
