"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import {
  requireParentForTutors,
  requireTutorProfile,
  getParentProfileForUser,
  assertHouseholdAccess,
} from "@/shared/lib/permissions";
import { logAudit } from "@/server/services/audit.service";
import { TutorStudentAccessSource } from "@prisma/client";
import { grantTutorStudentAccess, revokeTutorStudentAccess } from "@/features/tutors/services/tutor-student-access.service";
import { calculatePlatformFee } from "@/features/tutors/lib/tutor-fee";
import { TUTOR_CONSENT_VERSION } from "@/features/tutors/lib/tutor-consent";
import { createTutorPaymentIntent } from "@/features/tutors/services/tutor-payment.service";
import { getPublishedTutorById } from "@/features/tutors/services/tutor-profile.service";

const inquirySchema = z.object({
  tutorId: z.string().min(1),
  message: z.string().min(10).max(1000),
  childId: z.string().optional(),
});

export async function sendTutorInquiry(
  input: z.infer<typeof inquirySchema>,
): Promise<ActionResult<null>> {
  const user = await requireParentForTutors();
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const parent = await getParentProfileForUser(user.id);
  if (!parent) return fail("Parent profile not found");

  const tutor = await getPublishedTutorById(parsed.data.tutorId);
  if (!tutor) return fail("Tutor not found");

  if (parsed.data.childId) {
    await assertHouseholdAccess(parsed.data.childId, user.id);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inquiryCount = await prisma.tutorInquiry.count({
    where: { parentId: parent.id, createdAt: { gte: today } },
  });
  if (inquiryCount >= 10) return fail("Daily inquiry limit reached");

  await prisma.tutorInquiry.create({
    data: {
      tutorId: tutor.id,
      parentId: parent.id,
      childId: parsed.data.childId,
      message: parsed.data.message,
    },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.inquiry.send",
    resource: "TutorInquiry",
    resourceId: tutor.id,
  });

  revalidatePath(`/parent/tutors/${tutor.id}`);
  return ok(null);
}

const respondSchema = z.object({
  inquiryId: z.string().min(1),
  response: z.string().min(5).max(1000),
});

export async function respondToTutorInquiry(
  input: z.infer<typeof respondSchema>,
): Promise<ActionResult<null>> {
  const { user, tutor } = await requireTutorProfile();
  const parsed = respondSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const inquiry = await prisma.tutorInquiry.findFirst({
    where: { id: parsed.data.inquiryId, tutorId: tutor.id },
  });
  if (!inquiry) return fail("Inquiry not found");

  await prisma.tutorInquiry.update({
    where: { id: inquiry.id },
    data: { response: parsed.data.response, status: "RESPONDED" },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.inquiry.respond",
    resource: "TutorInquiry",
    resourceId: inquiry.id,
  });

  revalidatePath("/tutor/inquiries");
  return ok(null);
}

const grantAccessSchema = z.object({
  tutorId: z.string().min(1),
  childId: z.string().min(1),
  learnerAlias: z.string().min(2).max(40),
  consentGranted: z.boolean().refine((v) => v, {
    message: "You must consent to share learning progress",
  }),
});

export async function grantTutorAccessToChild(
  input: z.infer<typeof grantAccessSchema>,
): Promise<ActionResult<null>> {
  const user = await requireParentForTutors();
  const parsed = grantAccessSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const parent = await getParentProfileForUser(user.id);
  if (!parent) return fail("Parent profile not found");

  await assertHouseholdAccess(parsed.data.childId, user.id);

  const tutor = await getPublishedTutorById(parsed.data.tutorId);
  if (!tutor) return fail("Tutor not found");

  await grantTutorStudentAccess({
    tutorProfileId: tutor.id,
    childId: parsed.data.childId,
    parentId: parent.id,
    learnerAlias: parsed.data.learnerAlias,
    source: TutorStudentAccessSource.MANUAL,
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.access.grant",
    resource: "TutorStudentAccess",
    resourceId: `${tutor.id}:${parsed.data.childId}`,
  });

  revalidatePath(`/parent/children/${parsed.data.childId}/tutors`);
  return ok(null);
}

const revokeAccessSchema = z.object({
  accessId: z.string().min(1),
});

export async function revokeTutorAccessFromChild(
  input: z.infer<typeof revokeAccessSchema>,
): Promise<ActionResult<null>> {
  const user = await requireParentForTutors();
  const parsed = revokeAccessSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const parent = await getParentProfileForUser(user.id);
  if (!parent) return fail("Parent profile not found");

  await revokeTutorStudentAccess(parsed.data.accessId, parent.id);

  await logAudit({
    actorId: user.id,
    action: "tutor.access.revoke",
    resource: "TutorStudentAccess",
    resourceId: parsed.data.accessId,
  });

  revalidatePath("/parent/settings");
  return ok(null);
}

const bookingSchema = z.object({
  tutorId: z.string().min(1),
  childId: z.string().optional(),
  amountPence: z.number().int().min(500),
  depositPence: z.number().int().min(0).optional(),
  autoShareProgress: z.boolean().default(true),
  learnerAlias: z.string().min(2).max(40).optional(),
  notes: z.string().max(500).optional(),
});

export async function confirmTutorBooking(
  input: z.infer<typeof bookingSchema>,
): Promise<ActionResult<{ bookingId: string; clientSecret?: string }>> {
  const user = await requireParentForTutors();
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const parent = await getParentProfileForUser(user.id);
  if (!parent) return fail("Parent profile not found");

  const tutor = await getPublishedTutorById(parsed.data.tutorId);
  if (!tutor) return fail("Tutor not found");
  if (!tutor.stripeAccountId) return fail("Tutor has not completed payment setup");

  if (parsed.data.childId) {
    await assertHouseholdAccess(parsed.data.childId, user.id);
  }

  if (parsed.data.autoShareProgress) {
    if (!parsed.data.childId) return fail("Child is required to share progress");
    if (!parsed.data.learnerAlias) return fail("Learner alias is required to share progress");
  }

  const platformFeePence = calculatePlatformFee(parsed.data.amountPence);

  const booking = await prisma.tutorBooking.create({
    data: {
      tutorId: tutor.id,
      parentId: parent.id,
      childId: parsed.data.childId,
      amountPence: parsed.data.amountPence,
      depositPence: parsed.data.depositPence,
      platformFeePence,
      status: "CONFIRMED",
      autoShareProgress: parsed.data.autoShareProgress,
      learnerAlias: parsed.data.learnerAlias,
      feeTermsVersion: TUTOR_CONSENT_VERSION,
      notes: parsed.data.notes,
    },
  });

  if (parsed.data.autoShareProgress && parsed.data.childId && parsed.data.learnerAlias) {
    await grantTutorStudentAccess({
      tutorProfileId: tutor.id,
      childId: parsed.data.childId,
      parentId: parent.id,
      learnerAlias: parsed.data.learnerAlias,
      source: TutorStudentAccessSource.BOOKING,
      bookingId: booking.id,
    });
  }

  const payAmount = parsed.data.depositPence && parsed.data.depositPence > 0
    ? parsed.data.depositPence
    : parsed.data.amountPence;

  let clientSecret: string | undefined;
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { parentId: parent.id },
      select: { stripeCustomerId: true },
    });
    const intent = await createTutorPaymentIntent({
      bookingId: booking.id,
      amountPence: payAmount,
      tutorStripeAccountId: tutor.stripeAccountId,
      parentStripeCustomerId: subscription?.stripeCustomerId ?? undefined,
    });
    clientSecret = intent.client_secret ?? undefined;
  } catch {
    // Stripe optional in dev — booking still created
  }

  await logAudit({
    actorId: user.id,
    action: "tutor.booking.confirm",
    resource: "TutorBooking",
    resourceId: booking.id,
  });

  revalidatePath("/parent/tutors");
  return ok({ bookingId: booking.id, clientSecret });
}

export async function startTutorStripeOnboarding(): Promise<ActionResult<{ url: string }>> {
  const { user, tutor } = await requireTutorProfile();

  const { createTutorConnectAccount, createTutorConnectOnboardingLink } = await import(
    "@/features/tutors/services/tutor-payment.service"
  );

  if (!tutor.stripeAccountId) {
    if (!user.email) return fail("Email required for payment setup");
    await createTutorConnectAccount(tutor.id, user.email);
  }

  const base = process.env.AUTH_URL ?? "http://localhost:3000";
  const url = await createTutorConnectOnboardingLink(
    tutor.id,
    `${base}/tutor/profile?stripe=done`,
    `${base}/tutor/profile?stripe=refresh`,
  );

  return ok({ url });
}
