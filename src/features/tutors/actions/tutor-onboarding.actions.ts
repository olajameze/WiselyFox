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
import { requireParentOwner } from "@/shared/lib/permissions";

const tutorSignUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
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
  const dob = parseDateOfBirth(dateOfBirth);
  if (!dob) return fail("Invalid date of birth");
  if (!isAdultTutorAge(dob)) return fail("You must be at least 18 years old to tutor");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return fail("An account with this email already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();

  const user = await prisma.user.create({
    data: {
      email,
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
