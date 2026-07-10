# Data Governance

## Lawful bases

| Tier | Data | Basis | Purpose |
|------|------|-------|---------|
| 1 | Learning progress, assessments | Contract / legitimate interest | Service delivery |
| 2 | Marketing email | Consent (opt-in) | Product updates |
| 3 | Aggregated insights | Anonymization | B2B education reports |
| 4 | Tutor marketplace | Contract / consent | Tutor profiles, parent inquiries, bookings, pseudonymous progress sharing |

## Tutor marketplace data

| Data | Who controls | Rules |
|------|--------------|-------|
| Tutor profile, photo, qualifications | Tutor | Admin-verified before publish; fee terms recorded in `TutorConsentRecord` |
| Parent inquiries & bookings | Parent | Parents only browse/contact tutors |
| Learner progress shared with tutor | Parent | Explicit grant per child with `learnerAlias` pseudonym; revocable anytime |
| Auto-share on booking | Parent | Optional at booking confirmation (`autoShareProgress`) |

Tutors never receive: child `displayName` (unless parent chooses alias), `accessCode`, PIN, `learningNeeds`, raw assessment responses, or household billing data.

Policy version: `TUTOR_CONSENT_VERSION` in `src/features/tutors/lib/tutor-consent.ts`.

## Parent consent flows (in-app)

| Step | Consent type | When | Record |
|------|--------------|------|--------|
| Sign-up | `TERMS`, `PRIVACY` | Required checkboxes on `/sign-up` | `ConsentRecord` v`CONSENT_VERSION` |
| Sign-up | `MARKETING` | Optional checkbox | Stored as granted true/false |
| Add child | `CHILD_DATA` | Required checkbox on onboarding step 4 | One record per child profile created |
| Settings | `MARKETING` | Opt in / opt out toggle | New record on each change (audit trail) |
| Settings | `CHILD_DATA` | Withdraw button | Sets latest record to `granted: false`; child `/learn` access blocked |

Policy version constant: `src/shared/lib/consent.ts` (`CONSENT_VERSION`). Bump when Terms/Privacy/child consent copy changes materially and re-prompt families if required by law.

## Rules

- Never sell identifiable child data
- B2B exports: k-anonymity minimum n=30 (`INSIGHTS_MIN_COHORT`)
- Parent can export/delete via settings
- All super-admin views are audit-logged

## Super admin access

- Seeded dev account: `admin@wiselyfox.test` (local only)
- Production: set `SUPERADMIN_EMAILS` to comma-separated parent account emails; role is promoted on sign-up/sign-in and audited
- Database `SUPERADMIN` role still respected for legacy accounts

## Retention

- Active accounts: duration of subscription + 30 days
- Audit logs: 12 months
- Anonymized aggregates: indefinite (no PII)

## Support & data subject requests

Configure in environment:

- `SUPPORT_EMAIL` — general support and GDPR requests
- `PILOT_COORDINATOR_EMAIL` — family pilot coordinator (defaults to support email)
- `PILOT_FEEDBACK_URL` — optional external feedback form

Public pages: `/support`, `/privacy`, `/terms`.
