# WiselyFox

Child-safe, parent-guided adaptive learning platform.

## Requirements

- Node.js 20+
- npm

## Setup

```bash
npm install
cp .env.example .env
# Edit .env — set AUTH_SECRET (min 16 chars)

docker compose up -d postgres
npm run db:migrate:deploy
npm run db:seed
npm run dev
```

Or use the all-in-one setup: `npm run db:setup` (requires Docker).

Open [http://localhost:3000](http://localhost:3000).

## Family pilot testing

See **[docs/FAMILY_TESTING.md](docs/FAMILY_TESTING.md)** for demo credentials, a 30-minute test script, and what is / isn't enabled during the pilot (no real billing).

**Demo parent:** `parent@demo.wiselyfox.test` / `demo123456`  
**Demo child:** access code `wfox-demo-alex` / PIN `1234`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run db:migrate` | Create/apply migrations in development |
| `npm run db:migrate:deploy` | Apply migrations in production/CI |
| `npm run db:setup` | Start local Postgres (Docker), migrate, and seed |
| `npm run db:seed` | Seed subjects and admin user |

## Default super admin (seed)

- Email: `admin@wiselyfox.test`
- Password: `admin123456`

## Architecture

- **Next.js 15** App Router + TypeScript
- **CSS Modules** only (no Tailwind)
- **Prisma** + PostgreSQL (local via Docker; hosted Postgres in production)
- **Auth.js v5** for parent + child PIN auth
- **Resend** for email
- **Stripe** for subscriptions (configure price IDs in `.env`)

See `BUILD.md` for development rules and `docs/` for detailed guides.
