"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import {
  requireTutorProfile,
  requireParentOwner,
  assertTutorStudentAccess,
} from "@/shared/lib/permissions";
import { logAudit } from "@/server/services/audit.service";
import { AssignmentStatus } from "@prisma/client";
import { sanitizeTutorNotes } from "@/features/tutors/lib/lesson-assignment-sanitize";

const assignmentSchema = z.object({
  studentId: z.string().min(1),
  lessonTitle: z.string().min(1).max(200),
  tutorNotes: z.string().max(2000),
});

export async function assignLessonToStudentAction(
  input: z.infer<typeof assignmentSchema>,
): Promise<ActionResult<{ assignmentId: string }>> {
  const parsed = assignmentSchema.safeParse(input);
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid assignment");
  }

  const { user } = await requireTutorProfile();

  // Sanitize incoming notes for links / off-platform payments.
  const tutorNotes = sanitizeTutorNotes(parsed.data.tutorNotes);

  // Strict binding: tutor must have active, pre-approved access to the student.
  await assertTutorStudentAccess(user.id, parsed.data.studentId);

  const child = await prisma.childProfile.findUnique({
    where: { id: parsed.data.studentId },
    select: { parentId: true },
  });
  if (!child) return fail("Student not found");

  const assignment = await prisma.lessonAssignment.create({
    data: {
      studentId: parsed.data.studentId,
      tutorId: user.id,
      parentId: child.parentId,
      lessonTitle: parsed.data.lessonTitle,
      tutorNotes,
      status: AssignmentStatus.ASSIGNED,
    },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.lesson.assign",
    resource: "LessonAssignment",
    resourceId: assignment.id,
  });

  revalidatePath("/tutor/students");
  revalidatePath("/parent");
  return ok({ assignmentId: assignment.id });
}

export async function flagAssignmentForAdmin(
  assignmentId: string,
): Promise<ActionResult<null>> {
  const user = await requireParentOwner();

  const assignment = await prisma.lessonAssignment.findUnique({
    where: { id: assignmentId },
    select: { parentId: true },
  });
  if (!assignment || assignment.parentId !== user.id) {
    return fail("Assignment not found");
  }

  await prisma.lessonAssignment.update({
    where: { id: assignmentId },
    data: { isFlaggedByParent: true },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.assignment.flag",
    resource: "LessonAssignment",
    resourceId: assignmentId,
  });

  revalidatePath("/parent");
  return ok(null);
}
