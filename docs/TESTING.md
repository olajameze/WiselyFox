# Testing Guide

## Unit & component tests (Vitest)

```bash
npm run test
npm run test:watch
```

Tests live in `tests/` and `src/**/*.test.tsx`.

## E2E tests (Playwright)

```bash
npx playwright install chromium
npm run test:e2e
```

## Coverage targets

- Authentication and permissions
- Assessment scoring
- Accommodation rules
- Rewards calculations
- Trial reminder scheduling
- Core UI components
