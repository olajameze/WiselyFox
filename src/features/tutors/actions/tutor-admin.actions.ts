"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { requireSuperAdmin } from "@/shared/lib/permissions";
import { logAudit } from "@/server/services/audit.service";
import {
  approveTutorAge,
  approveTutorProfile,
  rejectTutorVerification,
  suspendTutor,
} from "@/features/tutors/services/tutor-verification.service";

const reviewSchema = z.object({
  tutorId: z.string().min(1),
  note: z.string().max(500).optional(),
});

export async function adminApproveTutorAge(
  input: z.infer<typeof reviewSchema>,
): Promise<ActionResult<null>> {
  const admin = await requireSuperAdmin();
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  await approveTutorAge(parsed.data.tutorId, admin.id, parsed.data.note);
  await logAudit({
    actorId: admin.id,
    action: "admin.tutor.age.approve",
    resource: "TutorProfile",
    resourceId: parsed.data.tutorId,
  });

  revalidatePath("/admin/tutors");
  return ok(null);
}

export async function adminApproveTutorProfile(
  input: z.infer<typeof reviewSchema>,
): Promise<ActionResult<null>> {
  const admin = await requireSuperAdmin();
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  await approveTutorProfile(parsed.data.tutorId, admin.id, parsed.data.note);
  await logAudit({
    actorId: admin.id,
    action: "admin.tutor.profile.approve",
    resource: "TutorProfile",
    resourceId: parsed.data.tutorId,
  });

  revalidatePath("/admin/tutors");
  return ok(null);
}

const rejectSchema = z.object({
  tutorId: z.string().min(1),
  type: z.enum(["age", "profile"]),
  note: z.string().max(500).optional(),
});

export async function adminRejectTutor(
  input: z.infer<typeof rejectSchema>,
): Promise<ActionResult<null>> {
  const admin = await requireSuperAdmin();
  const parsed = rejectSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  await rejectTutorVerification(parsed.data.tutorId, admin.id, parsed.data.type, parsed.data.note);
  await logAudit({
    actorId: admin.id,
    action: "admin.tutor.reject",
    resource: "TutorProfile",
    resourceId: parsed.data.tutorId,
  });

  revalidatePath("/admin/tutors");
  return ok(null);
}

export async function adminSuspendTutor(
  input: z.infer<typeof reviewSchema>,
): Promise<ActionResult<null>> {
  const admin = await requireSuperAdmin();
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  await suspendTutor(parsed.data.tutorId, admin.id, parsed.data.note);
  await logAudit({
    actorId: admin.id,
    action: "admin.tutor.suspend",
    resource: "TutorProfile",
    resourceId: parsed.data.tutorId,
  });

  revalidatePath("/admin/tutors");
  return ok(null);
}
