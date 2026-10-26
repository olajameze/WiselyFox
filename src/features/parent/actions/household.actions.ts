"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { logAudit } from "@/server/services/audit.service";
import { createUserNotification } from "@/server/services/notification-delivery.service";

const scheduleItemSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  title: z.string().min(1).max(80),
  subject: z.string().optional(),
  timeLabel: z.string().optional(),
  sortOrder: z.number().default(0),
});

export async function saveChildSchedule(
  childId: string,
  items: z.infer<typeof scheduleItemSchema>[],
): Promise<ActionResult<null>> {
  const user = await requireParentOwner();
  await assertHouseholdAccess(childId, user.id);

  const parsed = z.array(scheduleItemSchema).safeParse(items);
  if (!parsed.success) return fail("Invalid schedule data");

  await prisma.learningScheduleItem.deleteMany({ where: { childId } });
  if (parsed.data.length > 0) {
    await prisma.learningScheduleItem.createMany({
      data: parsed.data.map((item) => ({ ...item, childId })),
    });
  }

  await logAudit({
    actorId: user.id,
    action: "child.schedule.update",
    resource: "ChildProfile",
    resourceId: childId,
  });

  revalidatePath(`/parent/schedule/${childId}`);
  revalidatePath("/learn");
  return ok(null);
}

const accessibilitySchema = z.object({
  childId: z.string(),
  calmColors: z.boolean(),
  reducedMotion: z.boolean(),
  highContrast: z.boolean(),
  dyslexiaFriendly: z.boolean(),
  largeText: z.boolean(),
  soundEnabled: z.boolean(),
  hideTimers: z.boolean(),
  sessionLengthMinutes: z.coerce.number().min(5).max(45),
});

export async function updateChildAccessibility(
  input: z.infer<typeof accessibilitySchema>,
): Promise<ActionResult<null>> {
  const user = await requireParentOwner();
  const parsed = accessibilitySchema.safeParse(input);
  if (!parsed.success) return fail("Invalid settings");

  await assertHouseholdAccess(parsed.data.childId, user.id);

  await prisma.learningProfile.updateMany({
    where: { childId: parsed.data.childId },
    data: {
      calmColors: parsed.data.calmColors,
      reducedMotion: parsed.data.reducedMotion,
      highContrast: parsed.data.highContrast,
      dyslexiaFriendly: parsed.data.dyslexiaFriendly,
      largeText: parsed.data.largeText,
      soundEnabled: parsed.data.soundEnabled,
      hideTimers: parsed.data.hideTimers,
      sessionLengthMinutes: parsed.data.sessionLengthMinutes,
    },
  });

  revalidatePath(`/parent/children/${parsed.data.childId}/accessibility`);
  revalidatePath("/learn");
  return ok(null);
}

export async function approveReward(rewardId: string): Promise<ActionResult<null>> {
  const user = await requireParentOwner();
  const reward = await prisma.reward.findUnique({
    where: { id: rewardId },
    include: { child: { include: { parent: true } } },
  });
  if (!reward || reward.child.parent.userId !== user.id) return fail("Reward not found");

  await prisma.reward.update({
    where: { id: rewardId },
    data: { approved: true },
  });

  if (reward.child.userId) {
    await createUserNotification({
      userId: reward.child.userId,
      type: "ACHIEVEMENT",
      title: "Reward approved!",
      body: `Your parent approved: ${reward.title}`,
      url: "/learn/rewards",
    });
  }

  revalidatePath("/parent/rewards");
  revalidatePath("/learn");
  revalidatePath("/learn/rewards");
  return ok(null);
}

export async function rejectReward(rewardId: string): Promise<ActionResult<null>> {
  const user = await requireParentOwner();
  const reward = await prisma.reward.findUnique({
    where: { id: rewardId },
    include: { child: { include: { parent: true } } },
  });
  if (!reward || reward.child.parent.userId !== user.id) return fail("Reward not found");

  await prisma.reward.delete({ where: { id: rewardId } });
  revalidatePath("/parent/rewards");
  return ok(null);
}

export async function exportHouseholdData(): Promise<ActionResult<{ json: string }>> {
  const user = await requireParentOwner();
  const parent = await prisma.parentProfile.findUnique({
    where: { userId: user.id },
    include: {
      children: {
        include: {
          learningProfile: true,
          masteryRecords: true,
          assessments: true,
          studySessions: { take: 50, orderBy: { startedAt: "desc" } },
        },
      },
      subscription: true,
    },
  });
  if (!parent) return fail("Profile not found");

  const exportData = {
    exportedAt: new Date().toISOString(),
    parent: { email: user.email, name: user.name },
    subscription: parent.subscription,
    children: parent.children.map((c) => ({
      displayName: c.displayName,
      ageBand: c.ageBand,
      learningProfile: c.learningProfile,
      masteryRecords: c.masteryRecords,
      assessments: c.assessments,
      recentSessions: c.studySessions,
    })),
  };

  await logAudit({
    actorId: user.id,
    action: "parent.data.export",
    resource: "ParentProfile",
    resourceId: parent.id,
  });

  return ok({ json: JSON.stringify(exportData, null, 2) });
}
