import { describe, it, expect } from "vitest";
import { sanitizeTutorNotes } from "@/features/tutors/lib/lesson-assignment-sanitize";

describe("sanitizeTutorNotes", () => {
  it("removes external links", () => {
    const sanitized = sanitizeTutorNotes("See https://example.com/notes for details");
    expect(sanitized).toContain("[link removed]");
    expect(sanitized).not.toContain("https://");
  });

  it("removes off-platform payment method mentions", () => {
    const sanitized = sanitizeTutorNotes("Message me on PayPal, Venmo or zelle to pay");
    expect(sanitized).not.toMatch(/paypal|venmo|zelle/i);
    expect(sanitized).toContain("[payment method removed]");
  });

  it("handles combined payment keywords and links", () => {
    const sanitized = sanitizeTutorNotes(
      "Pay via bank transfer or stripe.me, details at https://pay.example.com",
    );
    expect(sanitized).not.toMatch(/bank\s*transfer|stripe\.me/i);
    expect(sanitized).not.toContain("http");
    expect(sanitized).toContain("[payment method removed]");
    expect(sanitized).toContain("[link removed]");
  });

  it("returns clean text unchanged", () => {
    expect(sanitizeTutorNotes("Great lesson today!")).toBe("Great lesson today!");
  });
});

