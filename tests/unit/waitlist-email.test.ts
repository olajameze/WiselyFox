import { describe, it, expect, vi, beforeAll } from "vitest";

beforeAll(() => {
  process.env.DATABASE_URL = process.env.DATABASE_URL ?? "file:./test.db";
  process.env.AUTH_SECRET = process.env.AUTH_SECRET ?? "test-secret-min-16-chars";
  process.env.AUTH_URL = process.env.AUTH_URL ?? "http://localhost:3000";
});

const sent = vi.hoisted(() => {
  const emails: Array<{
    to: string;
    subject: string;
    html: string;
  }> = [];
  return { emails, capture: vi.fn((params: { to: string; subject: string; html: string }) => {
    emails.push(params);
    return { data: { id: "test-id" } };
  }) };
});

vi.mock("@/shared/lib/resend", () => ({
  getResend: () => ({ emails: { send: sent.capture } }),
}));

import { sendWaitlistConfirmationEmail } from "@/server/services/email.service";

describe("waitlist confirmation email", () => {
  it("builds a complete email with age band labels", async () => {
    sent.emails.length = 0;
    await sendWaitlistConfirmationEmail("parent@example.com", "Sam", [
      "Ages 5 to 7",
      "Ages 8 to 10",
    ]);

    expect(sent.emails).toHaveLength(1);
    const email = sent.emails[0];
    expect(email.to).toBe("parent@example.com");
    expect(email.subject).toContain("priority WiselyFox waiting list");
    expect(email.html).toContain("Sam,");
    expect(email.html).toContain("Ages 5 to 7");
    expect(email.html).toContain("Ages 8 to 10");
    expect(email.html).toContain("Calm Mode");
    expect(email.html).toContain("Age-Elastic layout");
    expect(email.html).toContain("Join the family pilot");
  });

  it("escapes user-supplied text to prevent HTML injection", async () => {
    sent.emails.length = 0;
    const maliciousName = "<script>alert('xss')</script>";
    await sendWaitlistConfirmationEmail("parent@example.com", maliciousName);

    expect(sent.emails).toHaveLength(1);
    const html = sent.emails[0].html;
    expect(html).not.toContain("<script>");
    const escapedOpenTag = ["&", "lt;", "script", "&", "gt;"].join("");
    expect(html).toContain(escapedOpenTag);
  });

  it("uses a generic greeting when no name is provided", async () => {
    sent.emails.length = 0;
    await sendWaitlistConfirmationEmail("parent@example.com");

    expect(sent.emails).toHaveLength(1);
    expect(sent.emails[0].html).toContain("Hello,");
  });
});
