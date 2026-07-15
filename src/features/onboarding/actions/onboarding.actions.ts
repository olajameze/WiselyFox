"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { PlanTier, UserRole, type EngagementStyle } from "@prisma/client";
import { logAudit } from "@/server/services/audit.service";
import { recordChildDataConsent } from "@/features/parent/actions/consent.actions";
import { mergeAccessibilityFromOnboarding } from "@/features/inclusive/services/accommodation.service";

const childSchema = z.object({
  displayName: z.string().min(1).max(50),
  ageBand: z.enum(["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"]),
  yearGroup: z.string().optional(),
  interests: z.string().optional(),
  curriculum: z.string().optional(),
  goals: z.string().optional(),
  concerns: z.string().optional(),
  pin: z.string().min(4).max(6),
  learningNeeds: z.array(z.string()).default([]),
  reducedMotion: z.boolean().default(false),
  calmColors: z.boolean().default(false),
  sessionLengthMinutes: z.coerce.number().min(5).max(45).default(15),
  engagementStyle: z.enum(["GENTLE", "BALANCED", "ENERGETIC"]).default("BALANCED"),
  childDataConsent: z.literal(true, {
    message: "Parent consent is required before creating a child profile",
  }),
});

export async function createChildProfile(
  input: z.infer<typeof childSchema>,
): Promise<ActionResult<{ accessCode: string }>> {
  const user = await requireParentOwner();
  const parsed = childSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const parent = await prisma.parentProfile.findUnique({
    where: { userId: user.id },
    include: { subscription: true, children: true },
  });
  if (!parent) return fail("Parent profile not found");

  const plan = parent.subscription?.plan ?? PlanTier.ESSENTIAL;
  const limit = plan === PlanTier.FAMILY ? 5 : 1;
  if (parent.children.length >= limit) {
    return fail(
      plan === PlanTier.ESSENTIAL
        ? "Essential plan supports 1 child. Upgrade to Family to add more."
        : "Maximum 5 children reached.",
    );
  }

  const pinHash = await bcrypt.hash(parsed.data.pin, 10);
  const accessibility = mergeAccessibilityFromOnboarding(parsed.data.learningNeeds, {
    reducedMotion: parsed.data.reducedMotion,
    calmColors: parsed.data.calmColors,
  });
  const engagementStyle: EngagementStyle = parsed.data.learningNeeds.includes("ANXIETY")
    ? "GENTLE"
    : parsed.data.engagementStyle;

  const childUser = await prisma.user.create({
    data: { name: parsed.data.displayName, role: UserRole.CHILD },
  });

  const child = await prisma.childProfile.create({
    data: {
      parentId: parent.id,
      userId: childUser.id,
      displayName: parsed.data.displayName,
      ageBand: parsed.data.ageBand,
      yearGroup: parsed.data.yearGroup,
      interests: parsed.data.interests,
      curriculum: parsed.data.curriculum,
      goals: parsed.data.goals,
      concerns: parsed.data.concerns,
      pinHash,
      learningProfile: {
        create: {
          learningNeeds: JSON.stringify(parsed.data.learningNeeds),
          reducedMotion: accessibility.reducedMotion,
          calmColors: accessibility.calmColors,
          hideTimers: accessibility.hideTimers,
          dyslexiaFriendly: accessibility.dyslexiaFriendly,
          largeText: accessibility.largeText,
          sessionLengthMinutes: parsed.data.sessionLengthMinutes,
          engagementStyle,
        },
      },
    },
  });

  await logAudit({
    actorId: user.id,
    action: "child.create",
    resource: "ChildProfile",
    resourceId: child.id,
  });

  await recordChildDataConsent(parent.id, user.id);

  return ok({ accessCode: child.accessCode });
}

export async function completeOnboarding(): Promise<ActionResult<null>> {
  const user = await requireParentOwner();
  const parent = await prisma.parentProfile.findUnique({ where: { userId: user.id } });
  if (!parent) return fail("Parent profile not found");

  await prisma.parentProfile.update({
    where: { userId: user.id },
    data: { onboardingDone: true },
  });
  return ok(null);
}

const assessmentAnswerSchema = z.object({
  childId: z.string(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      correct: z.boolean(),
      responseTimeMs: z.number(),
      confidence: z.number().min(1).max(5),
    }),
  ),
});

export async function submitAssessment(
  input: z.infer<typeof assessmentAnswerSchema>,
): Promise<ActionResult<{ level: string; score: number }>> {
  const user = await requireParentOwner();
  const parsed = assessmentAnswerSchema.safeParse(input);
  if (!parsed.success) return fail("Invalid assessment data");

  await assertHouseholdAccess(parsed.data.childId, user.id);

  const total = parsed.data.answers.length;
  const correct = parsed.data.answers.filter((a) => a.correct).length;
  const score = total > 0 ? (correct / total) * 100 : 0;
  const avgConfidence =
    parsed.data.answers.reduce((s, a) => s + a.confidence, 0) / Math.max(total, 1);

  let level = "Foundation";
  if (score >= 80 && avgConfidence >= 3.5) level = "Advanced";
  else if (score >= 55) level = "Developing";
  else if (score >= 30) level = "Emerging";

  await prisma.assessment.create({
    data: {
      childId: parsed.data.childId,
      responses: JSON.stringify(parsed.data.answers),
      scores: JSON.stringify({ score, avgConfidence }),
      levelResult: level,
    },
  });

  await prisma.learningProfile.updateMany({
    where: { childId: parsed.data.childId },
    data: { levelScore: score },
  });

  return ok({ level, score });
}
