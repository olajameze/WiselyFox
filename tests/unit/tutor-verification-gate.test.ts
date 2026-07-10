import { describe, it, expect } from "vitest";
import { canPublishTutorProfile } from "@/features/tutors/services/tutor-profile.service";
import { TutorVerificationStatus } from "@prisma/client";

describe("tutor publish gate", () => {
  it("blocks publish without photo", () => {
    expect(
      canPublishTutorProfile({
        profilePhotoUrl: null,
        ageVerifiedAt: new Date(),
        feeTermsAcceptedAt: new Date(),
        verificationStatus: TutorVerificationStatus.VERIFIED,
      }),
    ).toBe(false);
  });

  it("blocks publish without age verification", () => {
    expect(
      canPublishTutorProfile({
        profilePhotoUrl: "https://example.com/photo.jpg",
        ageVerifiedAt: null,
        feeTermsAcceptedAt: new Date(),
        verificationStatus: TutorVerificationStatus.VERIFIED,
      }),
    ).toBe(false);
  });

  it("allows publish when all gates pass", () => {
    expect(
      canPublishTutorProfile({
        profilePhotoUrl: "https://example.com/photo.jpg",
        ageVerifiedAt: new Date(),
        feeTermsAcceptedAt: new Date(),
        verificationStatus: TutorVerificationStatus.VERIFIED,
      }),
    ).toBe(true);
  });
});
