import { prisma } from "@/shared/lib/prisma";
import { TutorVerificationStatus } from "@prisma/client";
import { canPublishTutorProfile } from "./tutor-profile.service";

export async function submitTutorForAgeReview(tutorId: string) {
  return prisma.tutorProfile.update({
    where: { id: tutorId },
    data: { verificationStatus: TutorVerificationStatus.PENDING_AGE_REVIEW },
  });
}

export async function approveTutorAge(tutorId: string, reviewerId: string, note?: string) {
  const tutor = await prisma.tutorProfile.findUnique({ where: { id: tutorId } });
  if (!tutor) throw new Error("Tutor not found");

  const nextStatus = tutor.profilePhotoUrl
    ? TutorVerificationStatus.PENDING_PROFILE_REVIEW
    : TutorVerificationStatus.PENDING_AGE_REVIEW;

  await prisma.tutorVerification.create({
    data: {
      tutorId,
      type: "age",
      status: "approved",
      reviewedById: reviewerId,
      metadata: note ?? null,
    },
  });

  return prisma.tutorProfile.update({
    where: { id: tutorId },
    data: {
      ageVerifiedAt: new Date(),
      verificationStatus: nextStatus,
    },
  });
}

export async function approveTutorProfile(tutorId: string, reviewerId: string, note?: string) {
  const tutor = await prisma.tutorProfile.findUnique({ where: { id: tutorId } });
  if (!tutor) throw new Error("Tutor not found");

  if (!canPublishTutorProfile(tutor)) {
    throw new Error(
      "Tutor is missing required items for publication (photo, age verification, fee terms, safety documents)",
    );
  }

  await prisma.tutorVerification.create({
    data: {
      tutorId,
      type: "profile",
      status: "approved",
      reviewedById: reviewerId,
      metadata: note ?? null,
    },
  });

  return prisma.tutorProfile.update({
    where: { id: tutorId },
    data: {
      verificationStatus: TutorVerificationStatus.VERIFIED,
      isVerified: true,
      verifiedAt: new Date(),
      published: true,
    },
  });
}

export async function rejectTutorVerification(
  tutorId: string,
  reviewerId: string,
  type: "age" | "profile",
  note?: string,
) {
  await prisma.tutorVerification.create({
    data: {
      tutorId,
      type,
      status: "rejected",
      reviewedById: reviewerId,
      metadata: note ?? null,
    },
  });

  return prisma.tutorProfile.update({
    where: { id: tutorId },
    data: {
      verificationStatus: TutorVerificationStatus.REJECTED,
      isVerified: false,
      published: false,
    },
  });
}

export async function suspendTutor(tutorId: string, reviewerId: string, note?: string) {
  await prisma.tutorVerification.create({
    data: {
      tutorId,
      type: "suspension",
      status: "suspended",
      reviewedById: reviewerId,
      metadata: note ?? null,
    },
  });

  return prisma.tutorProfile.update({
    where: { id: tutorId },
    data: {
      verificationStatus: TutorVerificationStatus.SUSPENDED,
      isVerified: false,
      published: false,
    },
  });
}

export async function getTutorsPendingReview() {
  return prisma.tutorProfile.findMany({
    where: {
      verificationStatus: {
        in: [
          TutorVerificationStatus.PENDING_AGE_REVIEW,
          TutorVerificationStatus.PENDING_PROFILE_REVIEW,
        ],
      },
    },
    include: {
      user: { select: { email: true, name: true } },
      verifications: { orderBy: { createdAt: "desc" }, take: 3 },
    },
    orderBy: { updatedAt: "asc" },
  });
}
