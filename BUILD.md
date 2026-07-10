# WiselyFox Build Contract

Non-negotiable rules for all contributors and agents.

| Rule | Requirement |
|------|-------------|
| Incremental phases | Complete acceptance criteria before advancing |
| No placeholders | No lorem ipsum or broken routes unless listed in `docs/BACKLOG.md` |
| Tests | Unit + component tests for logic/UI; E2E for user journeys |
| Styling | CSS Modules or plain CSS only; tokens in `globals.css` |
| Dependencies | Free/OSS only |
| Security | Server-side Zod validation; RBAC on protected actions |
| Accessibility | WCAG 2.1 AA target |
| Motion | Respect `prefers-reduced-motion` |
| Child safety | No public child PII; child data never sold or used for marketing |
| Data law | GDPR-compliant; anonymized B2B exports only |

## Phase gate checklist

1. `npm run lint`
2. `npm run test`
3. `npm run test:e2e`
4. Responsive check at 375px, 768px, 1280px
5. Update `docs/CHANGELOG.md`
