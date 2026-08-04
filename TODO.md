# TODO — Waitlist CTA Production Pipeline

- [x] Explore repo, gather context, get plan approved
- [x] Task 1: Rename/migrate Prisma model to `WaitlistLead` + `ageBands`
- [x] Task 2a: Add `turnstile.service.ts` (Cloudflare siteverify)
- [x] Task 2b: Extend rate limiter with `waitlist` action
- [x] Task 2c: Rewrite `waitlist.actions.ts` with `joinWaitlistAction` (Zod + Turnstile + upsert)
- [x] Task 2d: Add `TurnstileWidget.tsx` client component
- [x] Task 2e: Update `WaitlistSection.tsx` (age-band chips + widget + graceful errors)
- [x] Task 2f: Add waitlist chip + turnstile styles to `marketing.module.css`
- [x] Task 3: Rework `sendWaitlistConfirmationEmail` (typography-optimized Resend email)
- [x] Tests: turnstile (5), waitlist email (3), waitlist action/schema (5) — all green
- [x] Run `prisma migrate dev` + `prisma generate`
- [x] Verify waitlist unit tests pass (13/13)
- [x] Fix stray `r` at top of `marketing.module.css` (CSS corruption)
- [x] Fix waitlist migration (PostgreSQL auto-renames constraints on table rename)
- [x] Verify migration status (schema up to date) + typecheck (`npx tsc --noEmit`)
