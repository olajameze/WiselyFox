import "@testing-library/jest-dom/vitest";

process.env.DATABASE_URL =
  process.env.DATABASE_URL ?? "postgresql://wiselyfox:wiselyfox@localhost:5433/wiselyfox";
process.env.AUTH_SECRET = process.env.AUTH_SECRET ?? "test-secret-min-16-chars";
