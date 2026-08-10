# WiselyFox Build — Implementation TODO

## EPIC 1: Multi-step Notebook Login Portal ✅ (COMPLETE)
- [x] LoginFlow, LoginStepOne/Two, FoxMascot, CSS modules
- [x] Wire `/sign-in` and `/tutor/sign-in` to LoginFlow
- [x] Lint, typecheck, E2E login-flow tests pass

## EPIC 2: Production Stripe Subscription Infrastructure ✅ (COMPLETE)
- [x] billing.service.ts, billing.actions.ts, Stripe webhook

## EPIC 3: Governance & Proposal Pipelines ✅ (COMPLETE)
- [x] Prisma TutorProposal, proposal actions, ObserverLedger

## EPIC 4: Tutor Assignment & Parent Monitoring ✅ (COMPLETE)
- [x] Prisma LessonAssignment, assignment actions, ParentWorkspaceMonitor

## QA / Final
- [x] Unit tests (billing, proposals, assignments, RBAC) — 17 passing
- [x] `npm run lint`, `npm run test` (unit)
- [x] Global ThemeToggle + Accessibility on all pages
- [x] Test login details + super-admin note on login form
- [x] Standalone Sign out button on all dashboards
- [x] `npm run test:e2e`
- [x] Update `docs/CHANGELOG.md`
