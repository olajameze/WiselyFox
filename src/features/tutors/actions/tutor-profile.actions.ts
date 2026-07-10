"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { requireTutorProfile } from "@/shared/lib/permissions";
import { logAudit } from "@/server/services/audit.service";
import { TutorVerificationStatus } from "@prisma/client";
import { submitTutorForAgeReview } from "@/features/tutors/services/tutor-verification.service";

const profileSchema = z.object({
  headline: z.string().min(5).max(120),
  bio: z.string().min(20).max(2000),
  experienceSummary: z.string().max(2000).default(""),
  subjects: z.array(z.string().min(1)).min(1),
  ageBands: z.array(z.string().min(1)).min(1),
  qualifications: z.array(z.string()).default([]),
  hourlyRatePence: z.number().int().min(500).max(50000),
  acceptsDeposits: z.boolean().default(false),
  depositPercent: z.number().int().min(10).max(50).optional(),
});

export async function updateTutorProfile(
  input: z.infer<typeof profileSchema>,
): Promise<ActionResult<null>> {
  const { user, tutor } = await requireTutorProfile();
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  if (parsed.data.acceptsDeposits && !parsed.data.depositPercent) {
    return fail("Deposit percent is required when accepting deposits");
  }

  await prisma.tutorProfile.update({
    where: { id: tutor.id },
    data: {
      headline: parsed.data.headline,
      bio: parsed.data.bio,
      experienceSummary: parsed.data.experienceSummary,
      subjects: JSON.stringify(parsed.data.subjects),
      ageBands: JSON.stringify(parsed.data.ageBands),
      qualifications: JSON.stringify(parsed.data.qualifications),
      hourlyRatePence: parsed.data.hourlyRatePence,
      acceptsDeposits: parsed.data.acceptsDeposits,
      depositPercent: parsed.data.acceptsDeposits ? parsed.data.depositPercent : null,
      verificationStatus:
        tutor.verificationStatus === TutorVerificationStatus.DRAFT
          ? TutorVerificationStatus.PENDING_PROFILE_REVIEW
          : tutor.verificationStatus,
    },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.profile.update",
    resource: "TutorProfile",
    resourceId: tutor.id,
  });

  revalidatePath("/tutor/profile");
  return ok(null);
}

export async function submitTutorProfileForReview(): Promise<ActionResult<null>> {
  const { user, tutor } = await requireTutorProfile();

  if (!tutor.profilePhotoUrl) return fail("Profile photo is required");
  if (!tutor.feeTermsAcceptedAt) return fail("Fee terms must be accepted");
  if (!tutor.dateOfBirth) return fail("Date of birth is required");

  if (!tutor.ageVerifiedAt) {
    await submitTutorForAgeReview(tutor.id);
    return ok(null);
  }

  await prisma.tutorProfile.update({
    where: { id: tutor.id },
    data: { verificationStatus: TutorVerificationStatus.PENDING_PROFILE_REVIEW },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.profile.submit_review",
    resource: "TutorProfile",
    resourceId: tutor.id,
  });

  revalidatePath("/tutor/profile");
  return ok(null);
}

export async function setTutorProfilePhoto(photoUrl: string): Promise<ActionResult<null>> {
  const { user, tutor } = await requireTutorProfile();
  if (!photoUrl.startsWith("http")) return fail("Invalid photo URL");

  await prisma.tutorProfile.update({
    where: { id: tutor.id },
    data: { profilePhotoUrl: photoUrl },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.photo.update",
    resource: "TutorProfile",
    resourceId: tutor.id,
  });

  revalidatePath("/tutor/profile");
  return ok(null);
}

export async function setTutorCvUrl(cvUrl: string): Promise<ActionResult<null>> {
  const { user, tutor } = await requireTutorProfile();
  if (!cvUrl.startsWith("http")) return fail("Invalid CV URL");

  await prisma.tutorProfile.update({
    where: { id: tutor.id },
    data: { cvUrl },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.cv.update",
    resource: "TutorProfile",
    resourceId: tutor.id,
  });

  revalidatePath("/tutor/profile");
  return ok(null);
}

export async function removeTutorCv(): Promise<ActionResult<null>> {
  const { user, tutor } = await requireTutorProfile();

  await prisma.tutorProfile.update({
    where: { id: tutor.id },
    data: { cvUrl: null },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.cv.remove",
    resource: "TutorProfile",
    resourceId: tutor.id,
  });

  revalidatePath("/tutor/profile");
  return ok(null);
}
