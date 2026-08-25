import { describe, it, expect, vi } from "vitest";
import { saveTutorOnboardingAction } from "@/features/tutors/actions/tutor-onboarding.actions";

vi.mock("@/shared/lib/permissions", () => ({
  requireTutorProfile: vi.fn(async () => ({
    user: { id: "user_test_123", email: "tutor@test.com", role: "PARENT" },
    tutor: { id: "tutor_test_123", userId: "user_test_123", isVerified: false },
  })),
  requireParentOwner: vi.fn(),
}));

vi.mock("@/shared/lib/prisma", () => ({
  prisma: {
    tutorProfile: {
      update: vi.fn(async ({ data }) => ({ id: "tutor_test_123", ...data })),
    },
  },
}));

vi.mock("@/server/services/audit.service", () => ({
  logAudit: vi.fn(async () => { }),
}));

describe("saveTutorOnboardingAction", () => {
  it("rejects payload when any of the three safety documents is missing", async () => {
    const res = await saveTutorOnboardingAction({
      dbsLetterUrl: "https://blob.vercel-storage.com/dbs-123.pdf",
      photoIdUrl: "",
      proofOfAddressUrl: "https://blob.vercel-storage.com/address-123.pdf",
    });
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error).toBeDefined();
    }
  });

  it("succeeds when all three mandatory safety documents are present", async () => {
    const res = await saveTutorOnboardingAction({
      dbsLetterUrl: "https://blob.vercel-storage.com/dbs-123.pdf",
      photoIdUrl: "https://blob.vercel-storage.com/passport-123.jpg",
      proofOfAddressUrl: "https://blob.vercel-storage.com/utility-123.pdf",
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.tutorId).toBe("tutor_test_123");
    }
  });
});
