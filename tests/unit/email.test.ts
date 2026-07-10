import { describe, it, expect, vi, beforeAll } from "vitest";

beforeAll(() => {
  process.env.DATABASE_URL = process.env.DATABASE_URL ?? "file:./test.db";
  process.env.AUTH_SECRET = process.env.AUTH_SECRET ?? "test-secret-min-16-chars";
});

vi.mock("@/shared/lib/resend", () => ({
  getResend: () => null,
}));

describe("email service", () => {
  it("logs in dev mode when Resend is not configured", async () => {
    const { sendEmail } = await import("@/server/services/email.service");
    const result = await sendEmail({
      to: "test@example.com",
      subject: "Test",
      html: "<p>Hi</p>",
    });
    expect(result).toEqual({ id: "dev-mode" });
  });
});
