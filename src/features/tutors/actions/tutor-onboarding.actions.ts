"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { logAudit } from "@/server/services/audit.service";
import { UserRole, TutorConsentType } from "@prisma/client";
import { isAdultTutorAge, parseDateOfBirth } from "@/features/tutors/lib/tutor-age";
import {
  TUTOR_CONSENT_VERSION,
  TUTOR_FEE_COPY,
  TUTOR_TERMS_COPY,
} from "@/features/tutors/lib/tutor-consent";
import { submitTutorForAgeReview } from "@/features/tutors/services/tutor-verification.service";
import { requireParentOwner, requireTutorProfile, getSessionUser } from "@/shared/lib/permissions";
import { TutorVerificationStatus } from "@prisma/client";
import { strongPasswordSchema } from "@/shared/lib/password-strength";

const tutorOnboardingUploadsSchema = z.object({
  dbsLetterUrl: z.string().min(1, "Official DBS Certificate letter is required"),
  photoIdUrl: z.string().min(1, "Government Photo ID card is required"),
  proofOfAddressUrl: z.string().min(1, "Proof of Address document is required"),
});

export async function saveTutorOnboardingAction(
  input: z.infer<typeof tutorOnboardingUploadsSchema>,
): Promise<ActionResult<{ tutorId: string }>> {
  const { user, tutor } = await requireTutorProfile();
  const parsed = tutorOnboardingUploadsSchema.safeParse(input);
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "All three safety verification documents are mandatory");
  }

  const { dbsLetterUrl, photoIdUrl, proofOfAddressUrl } = parsed.data;
  if (!dbsLetterUrl.trim() || !photoIdUrl.trim() || !proofOfAddressUrl.trim()) {
    return fail("All three safety verification documents (DBS Certificate, Photo ID, Proof of Address) must be uploaded");
  }

  await prisma.tutorProfile.update({
    where: { id: tutor.id },
    data: {
      dbsLetterUrl,
      photoIdUrl,
      proofOfAddressUrl,
      isVerified: false,
      verificationStatus: TutorVerificationStatus.PENDING_PROFILE_REVIEW,
    },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.onboarding.documents.upload",
    resource: "TutorProfile",
    resourceId: tutor.id,
  });

  return ok({ tutorId: tutor.id });
}

const tutorSignUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: strongPasswordSchema,
  dateOfBirth: z.string().min(1),
  feeAccepted: z.boolean().refine((v) => v, { message: "You must accept the fee disclosure" }),
  termsAccepted: z.boolean().refine((v) => v, { message: "You must accept the tutor terms" }),
});

export async function signUpTutor(
  input: z.infer<typeof tutorSignUpSchema>,
): Promise<ActionResult<{ email: string }>> {
  const parsed = tutorSignUpSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const { name, email, password, dateOfBirth } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();
  const dob = parseDateOfBirth(dateOfBirth);
  if (!dob) return fail("Invalid date of birth");
  if (!isAdultTutorAge(dob)) return fail("You must be at least 18 years old to tutor");

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) return fail("An account with this email already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();

  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      name,
      passwordHash,
      role: UserRole.PARENT,
      tutorProfile: {
        create: {
          dateOfBirth: dob,
          feeTermsAcceptedAt: now,
          feeTermsVersion: TUTOR_CONSENT_VERSION,
        },
      },
    },
    include: { tutorProfile: true },
  });

  const tutorId = user.tutorProfile!.id;

  await prisma.tutorConsentRecord.createMany({
    data: [
      {
        tutorId,
        type: TutorConsentType.TUTOR_TERMS,
        granted: true,
        version: TUTOR_CONSENT_VERSION,
      },
      {
        tutorId,
        type: TutorConsentType.TUTOR_FEE_DISCLOSURE,
        granted: true,
        version: TUTOR_CONSENT_VERSION,
      },
    ],
  });

  await submitTutorForAgeReview(tutorId);
  await logAudit({ actorId: user.id, action: "tutor.signup", resource: "TutorProfile", resourceId: tutorId });

  return ok({ email });
}

const becomeTutorSchema = z.object({
  dateOfBirth: z.string().min(1),
  feeAccepted: z.boolean().refine((v) => v, { message: "You must accept the fee disclosure" }),
  termsAccepted: z.boolean().refine((v) => v, { message: "You must accept the tutor terms" }),
});

export async function becomeTutor(
  input: z.infer<typeof becomeTutorSchema>,
): Promise<ActionResult<{ tutorId: string }>> {
  const user = await requireParentOwner();
  const parsed = becomeTutorSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const existing = await prisma.tutorProfile.findUnique({ where: { userId: user.id } });
  if (existing) return ok({ tutorId: existing.id });

  const dob = parseDateOfBirth(parsed.data.dateOfBirth);
  if (!dob) return fail("Invalid date of birth");
  if (!isAdultTutorAge(dob)) return fail("You must be at least 18 years old to tutor");

  const now = new Date();
  const tutor = await prisma.tutorProfile.create({
    data: {
      userId: user.id,
      dateOfBirth: dob,
      feeTermsAcceptedAt: now,
      feeTermsVersion: TUTOR_CONSENT_VERSION,
    },
  });

  await prisma.tutorConsentRecord.createMany({
    data: [
      {
        tutorId: tutor.id,
        type: TutorConsentType.TUTOR_TERMS,
        granted: true,
        version: TUTOR_CONSENT_VERSION,
      },
      {
        tutorId: tutor.id,
        type: TutorConsentType.TUTOR_FEE_DISCLOSURE,
        granted: true,
        version: TUTOR_CONSENT_VERSION,
      },
    ],
  });

  await submitTutorForAgeReview(tutor.id);
  await logAudit({
    actorId: user.id,
    action: "tutor.become",
    resource: "TutorProfile",
    resourceId: tutor.id,
  });

  return ok({ tutorId: tutor.id });
}

export async function getTutorOnboardingCopy() {
  return {
    fee: TUTOR_FEE_COPY,
    terms: TUTOR_TERMS_COPY,
    version: TUTOR_CONSENT_VERSION,
  };
}

const tutorSocialSignUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  dateOfBirth: z.string().min(1),
  feeAccepted: z.boolean().refine((v) => v, { message: "You must accept the fee disclosure" }),
  termsAccepted: z.boolean().refine((v) => v, { message: "You must accept the tutor terms" }),
});

/**
 * Completes tutor registration for a user who has just signed in with a
 * social provider (Google / Facebook). The user record already exists from
 * the OAuth sign-in callback; this only adds the tutor profile and consents.
 */
export async function signUpTutorSocial(
  input: z.infer<typeof tutorSocialSignUpSchema>,
): Promise<ActionResult<{ tutorId: string }>> {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return fail("You must be signed in with Google or Facebook first");

  const parsed = tutorSocialSignUpSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const { name, email, dateOfBirth } = parsed.data;
  const dob = parseDateOfBirth(dateOfBirth);
  if (!dob) return fail("Invalid date of birth");
  if (!isAdultTutorAge(dob)) return fail("You must be at least 18 years old to tutor");

  // Ensure the email on file matches the signed-in social account
  if (email.trim().toLowerCase() !== (sessionUser.email ?? "").toLowerCase()) {
    return fail("Email must match the account you signed in with");
  }

  const existingTutor = await prisma.tutorProfile.findUnique({ where: { userId: sessionUser.id } });
  if (existingTutor) return ok({ tutorId: existingTutor.id });

  const dbUser = await prisma.user.findUnique({ where: { id: sessionUser.id } });
  if (!dbUser) return fail("Signed-in user no longer exists");

  const now = new Date();
  const tutor = await prisma.tutorProfile.create({
    data: {
      userId: sessionUser.id,
      dateOfBirth: dob,
      feeTermsAcceptedAt: now,
      feeTermsVersion: TUTOR_CONSENT_VERSION,
    },
  });

  if (name && name !== dbUser.name) {
    await prisma.user.update({ where: { id: sessionUser.id }, data: { name } });
  }

  await prisma.tutorConsentRecord.createMany({
    data: [
      {
        tutorId: tutor.id,
        type: TutorConsentType.TUTOR_TERMS,
        granted: true,
        version: TUTOR_CONSENT_VERSION,
      },
      {
        tutorId: tutor.id,
        type: TutorConsentType.TUTOR_FEE_DISCLOSURE,
        granted: true,
        version: TUTOR_CONSENT_VERSION,
      },
    ],
  });

  await submitTutorForAgeReview(tutor.id);
  await logAudit({
    actorId: sessionUser.id,
    action: "tutor.signup.social",
    resource: "TutorProfile",
    resourceId: tutor.id,
  });

  return ok({ tutorId: tutor.id });
}
