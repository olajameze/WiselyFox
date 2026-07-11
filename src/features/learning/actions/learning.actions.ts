"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { requireChild } from "@/shared/lib/permissions";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { calculateMastery, nextReviewDate } from "@/features/learning/services/learning-engine.service";
import { maybeOfferReward, maybeOfferQuizReward } from "@/features/gamification/services/reward-offers.service";
import { computeStudyRewards } from "@/features/gamification/services/rewards.service";
import { incrementQuest } from "@/features/gamification/services/quest-progress.service";
import { recordLessonCompletion } from "@/features/learning/services/lesson-progress.service";
import {
  maybeRecordSubjectCompletion,
  notifyParentQuizCompleted,
  recordQuizAttempt,
} from "@/features/learning/services/quiz-results.service";
import { logAudit } from "@/server/services/audit.service";

async function applyStudyRewards(childId: string, profileId: string, baseXp: number, perfect = false) {
  const profile = await prisma.learningProfile.findUnique({ where: { id: profileId } });
  if (!profile) return { xpGain: baseXp, prevXp: 0 };

  const { xp, coins, streakDays } = computeStudyRewards({
    baseXp,
    currentStreak: profile.streakDays,
    lastStudyDate: profile.lastStudyDate,
    perfect,
  });

  const prevXp = profile.xp;

  await prisma.learningProfile.update({
    where: { id: profileId },
    data: {
      xp: { increment: xp },
      coins: { increment: coins },
      streakDays,
      lastStudyDate: new Date(),
    },
  });

  await maybeOfferReward(childId, prevXp + xp, prevXp);
  return { xpGain: xp, prevXp };
}

export async function completeLesson(input: {
  subjectSlug: string;
  lessonSlug: string;
  durationMinutes: number;
}): Promise<ActionResult<{ xp: number }>> {
  const user = await requireChild();
  const child = await prisma.childProfile.findFirst({
    where: { userId: user.id },
    include: { learningProfile: true },
  });
  if (!child?.learningProfile) return fail("Child profile not found");

  const lesson = await prisma.lesson.findFirst({
    where: { slug: input.lessonSlug, subject: { slug: input.subjectSlug } },
  });
  if (!lesson) return fail("Lesson not found");

  const xpGain = 10 + lesson.difficulty * 5;
  const skillSlug = `${input.subjectSlug}:foundation`;
  const existing = await prisma.masteryRecord.findUnique({
    where: { childId_skillSlug: { childId: child.id, skillSlug } },
  });
  const newMastery =
    calculateMastery((existing?.masteryScore ?? 30) / 100, true, lesson.difficulty) * 100;

  await prisma.$transaction([
    prisma.studySession.create({
      data: {
        childId: child.id,
        durationMinutes: input.durationMinutes,
        focusMode: false,
        completed: true,
      },
    }),
    prisma.masteryRecord.upsert({
      where: { childId_skillSlug: { childId: child.id, skillSlug } },
      update: {
        attempts: { increment: 1 },
        masteryScore: newMastery,
        lastReviewAt: new Date(),
        nextReviewAt: nextReviewDate(newMastery / 100),
      },
      create: {
        childId: child.id,
        skillSlug,
        masteryScore: newMastery,
        attempts: 1,
        lastReviewAt: new Date(),
        nextReviewAt: nextReviewDate(newMastery / 100),
      },
    }),
  ]);

  const { xpGain: actualXp } = await applyStudyRewards(
    child.id,
    child.learningProfile.id,
    xpGain,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  await prisma.dailyObjective.updateMany({
    where: {
      childId: child.id,
      date: today,
      subject: input.subjectSlug,
      completed: false,
    },
    data: { completed: true },
  });

  await recordLessonCompletion(child.id, input.subjectSlug, input.lessonSlug);

  await incrementQuest(child.id, "lessons-week");

  await maybeRecordSubjectCompletion(child.id, input.subjectSlug);

  await logAudit({
    actorId: user.id,
    action: "child.lesson.complete",
    resource: "Lesson",
    resourceId: lesson.id,
  });

  revalidatePath("/learn");
  revalidatePath("/learn/rewards");
  revalidatePath("/learn/certificates");
  revalidatePath("/parent");
  revalidatePath(`/parent/children/${child.id}/certificates`);
  revalidatePath(`/parent/children/${child.id}/results`);
  revalidatePath(`/learn/subjects/${input.subjectSlug}`);
  revalidatePath(`/learn/lesson/${input.subjectSlug}/${input.lessonSlug}`);
  return ok({ xp: actualXp });
}

export async function completeQuiz(input: {
  subjectSlug: string;
  correct: number;
  total: number;
}): Promise<ActionResult<{ xp: number; score: number; passed: boolean; certificateCode: string | null; attemptId: string }>> {
  const user = await requireChild();
  const child = await prisma.childProfile.findFirst({
    where: { userId: user.id },
    include: { learningProfile: true },
  });
  if (!child?.learningProfile) return fail("Child profile not found");

  const subject = await prisma.subject.findUnique({ where: { slug: input.subjectSlug } });
  if (!subject) return fail("Subject not found");

  const score = input.total > 0 ? Math.round((input.correct / input.total) * 100) : 0;
  const baseXp = 5 + input.correct * 3;
  const skillSlug = `${input.subjectSlug}:foundation`;
  const passed = score >= 60;

  const existing = await prisma.masteryRecord.findUnique({
    where: { childId_skillSlug: { childId: child.id, skillSlug } },
  });
  const newMastery =
    calculateMastery((existing?.masteryScore ?? 30) / 100, passed, 2) * 100;

  await prisma.$transaction([
    prisma.studySession.create({
      data: {
        childId: child.id,
        durationMinutes: Math.max(5, input.total * 2),
        focusMode: false,
        completed: true,
      },
    }),
    prisma.masteryRecord.upsert({
      where: { childId_skillSlug: { childId: child.id, skillSlug } },
      update: {
        attempts: { increment: 1 },
        masteryScore: newMastery,
        lastReviewAt: new Date(),
        nextReviewAt: nextReviewDate(newMastery / 100),
      },
      create: {
        childId: child.id,
        skillSlug,
        masteryScore: newMastery,
        attempts: 1,
        lastReviewAt: new Date(),
        nextReviewAt: nextReviewDate(newMastery / 100),
      },
    }),
  ]);

  const { xpGain: actualXp } = await applyStudyRewards(
    child.id,
    child.learningProfile.id,
    baseXp,
    score === 100,
  );

  await maybeOfferQuizReward(child.id, score);
  if (passed) await incrementQuest(child.id, "quiz-week");

  const attempt = await recordQuizAttempt({
    childId: child.id,
    subjectSlug: input.subjectSlug,
    subjectTitle: subject.title,
    score,
    correct: input.correct,
    total: input.total,
  });

  await notifyParentQuizCompleted(child.id, {
    subjectSlug: input.subjectSlug,
    subjectTitle: subject.title,
    score,
    passed: attempt.passed,
    certificateCode: attempt.certificateCode,
    attemptId: attempt.id,
  });

  revalidatePath("/learn");
  revalidatePath("/learn/rewards");
  revalidatePath("/learn/certificates");
  revalidatePath("/parent");
  revalidatePath(`/parent/children/${child.id}/results`);
  revalidatePath(`/parent/children/${child.id}/certificates`);
  return ok({
    xp: actualXp,
    score,
    passed: attempt.passed,
    certificateCode: attempt.certificateCode,
    attemptId: attempt.id,
  });
}

const claimRewardSchema = z.object({ rewardId: z.string().min(1) });

export async function claimReward(rewardId: string): Promise<ActionResult<null>> {
  const user = await requireChild();
  const parsed = claimRewardSchema.safeParse({ rewardId });
  if (!parsed.success) return fail("Invalid reward");

  const child = await prisma.childProfile.findFirst({ where: { userId: user.id } });
  if (!child) return fail("Child profile not found");

  const reward = await prisma.reward.findUnique({ where: { id: parsed.data.rewardId } });
  if (!reward || reward.childId !== child.id) return fail("Reward not found");
  if (!reward.approved) return fail("Your parent has not approved this reward yet");
  if (reward.claimed) return fail("You already claimed this reward");

  await prisma.reward.update({
    where: { id: reward.id },
    data: { claimed: true },
  });

  await logAudit({
    actorId: user.id,
    action: "child.reward.claim",
    resource: "Reward",
    resourceId: reward.id,
  });

  revalidatePath("/learn");
  revalidatePath("/learn/rewards");
  revalidatePath("/parent/rewards");
  return ok(null);
}

export async function completeFocusSession(minutes: number): Promise<ActionResult<{ xp: number }>> {
  const user = await requireChild();
  const child = await prisma.childProfile.findFirst({
    where: { userId: user.id },
    include: { learningProfile: true },
  });
  if (!child?.learningProfile) return fail("Child profile not found");
  if (minutes < 5) return fail("Focus sessions must be at least 5 minutes");

  const baseXp = Math.min(20, minutes * 2);

  await prisma.studySession.create({
    data: {
      childId: child.id,
      durationMinutes: minutes,
      focusMode: true,
      completed: true,
    },
  });

  const { xpGain: actualXp } = await applyStudyRewards(
    child.id,
    child.learningProfile.id,
    baseXp,
  );

  await incrementQuest(child.id, "focus-week");

  revalidatePath("/learn");
  revalidatePath("/learn/rewards");
  revalidatePath("/learn/certificates");
  revalidatePath("/parent");
  return ok({ xp: actualXp });
}
