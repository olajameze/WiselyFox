import "@testing-library/jest-dom/vitest";

process.env.DATABASE_URL =
  process.env.DATABASE_URL ?? "postgresql://wiselyfox:wiselyfox@localhost:5433/wiselyfox";
process.env.AUTH_SECRET = process.env.AUTH_SECRET ?? "test-secret-min-16-chars";
process.env.STRIPE_PRICE_ESSENTIAL_MONTHLY =
  process.env.STRIPE_PRICE_ESSENTIAL_MONTHLY ?? "price_essential_monthly_test";
process.env.STRIPE_PRICE_ESSENTIAL_ANNUAL =
  process.env.STRIPE_PRICE_ESSENTIAL_ANNUAL ?? "price_essential_annual_test";
process.env.STRIPE_PRICE_FAMILY_MONTHLY =
  process.env.STRIPE_PRICE_FAMILY_MONTHLY ?? "price_family_monthly_test";
process.env.STRIPE_PRICE_FAMILY_ANNUAL =
  process.env.STRIPE_PRICE_FAMILY_ANNUAL ?? "price_family_annual_test";
