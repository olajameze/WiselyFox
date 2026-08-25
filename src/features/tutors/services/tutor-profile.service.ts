import { prisma } from "@/shared/lib/prisma";
import { TutorVerificationStatus } from "@prisma/client";

export async function getTutorProfileByUserId(userId: string) {
  return prisma.tutorProfile.findUnique({
    where: { userId },
    include: { consents: { orderBy: { createdAt: "desc" }, take: 5 } },
  });
}

export async function getPublishedTutors() {
  return prisma.tutorProfile.findMany({
    where: {
      published: true,
      verificationStatus: TutorVerificationStatus.VERIFIED,
    },
    include: {
      user: { select: { name: true } },
    },
    orderBy: { verifiedAt: "desc" },
  });
}

export async function getPublishedTutorById(tutorId: string) {
  return prisma.tutorProfile.findFirst({
    where: {
      id: tutorId,
      published: true,
      verificationStatus: TutorVerificationStatus.VERIFIED,
    },
    include: {
      user: { select: { name: true } },
    },
  });
}

export function canPublishTutorProfile(tutor: {
  profilePhotoUrl: string | null;
  ageVerifiedAt: Date | null;
  feeTermsAcceptedAt: Date | null;
  verificationStatus: TutorVerificationStatus;
  dbsLetterUrl?: string | null;
  photoIdUrl?: string | null;
  proofOfAddressUrl?: string | null;
  isVerified?: boolean;
}): boolean {
  // Safety documents are all-or-nothing: if any is supplied, all three are required.
  const anyDocSupplied = Boolean(
    tutor.dbsLetterUrl || tutor.photoIdUrl || tutor.proofOfAddressUrl,
  );
  const hasAllSafetyDocs = Boolean(
    tutor.dbsLetterUrl && tutor.photoIdUrl && tutor.proofOfAddressUrl,
  );

  return (
    Boolean(tutor.profilePhotoUrl) &&
    Boolean(tutor.ageVerifiedAt) &&
    Boolean(tutor.feeTermsAcceptedAt) &&
    tutor.verificationStatus === TutorVerificationStatus.VERIFIED &&
    (!anyDocSupplied || hasAllSafetyDocs)
  );
}

export function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}
