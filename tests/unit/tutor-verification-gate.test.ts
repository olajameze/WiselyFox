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

  it("blocks publish when safety documents are incomplete", () => {
    expect(
      canPublishTutorProfile({
        profilePhotoUrl: "https://example.com/photo.jpg",
        ageVerifiedAt: new Date(),
        feeTermsAcceptedAt: new Date(),
        verificationStatus: TutorVerificationStatus.VERIFIED,
        dbsLetterUrl: "https://example.com/dbs.pdf",
        photoIdUrl: null, // missing photo ID
        proofOfAddressUrl: "https://example.com/address.pdf",
      }),
    ).toBe(false);
  });

  it("allows publish when all 3 mandatory safety documents and verified status pass", () => {
    expect(
      canPublishTutorProfile({
        profilePhotoUrl: "https://example.com/photo.jpg",
        ageVerifiedAt: new Date(),
        feeTermsAcceptedAt: new Date(),
        verificationStatus: TutorVerificationStatus.VERIFIED,
        dbsLetterUrl: "https://example.com/dbs.pdf",
        photoIdUrl: "https://example.com/photo-id.png",
        proofOfAddressUrl: "https://example.com/address.pdf",
        isVerified: true,
      }),
    ).toBe(true);
  });
});
