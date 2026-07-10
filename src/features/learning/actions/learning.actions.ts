"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/shared/lib/prisma";
import { requireChild } from "@/shared/lib/permissions";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { calculateMastery, nextReviewDate } from "@/features/learning/services/learning-engine.service";
import { maybeOfferReward, maybeOfferQuizReward } from "@/features/gamification/services/reward-offers.service";
import { recordLessonCompletion } from "@/features/learning/services/lesson-progress.service";
import {
  maybeRecordSubjectCompletion,
  notifyParentQuizCompleted,
  recordQuizAttempt,
} from "@/features/learning/services/quiz-results.service";
import { logAudit } from "@/server/services/audit.service";

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
  const prevXp = child.learningProfile.xp;
  const skillSlug = `${input.subjectSlug}:foundation`;
  const existing = await prisma.masteryRecord.findUnique({
    where: { childId_skillSlug: { childId: child.id, skillSlug } },
  });
  const newMastery =
    calculateMastery((existing?.masteryScore ?? 30) / 100, true, lesson.difficulty) * 100;

  await prisma.$transaction([
    prisma.learningProfile.update({
      where: { id: child.learningProfile.id },
      data: {
        xp: { increment: xpGain },
        coins: { increment: 2 },
        lastStudyDate: new Date(),
      },
    }),
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

  await maybeOfferReward(child.id, prevXp + xpGain, prevXp);

  await recordLessonCompletion(child.id, input.subjectSlug, input.lessonSlug);

  await maybeRecordSubjectCompletion(child.id, input.subjectSlug);

  await logAudit({
    actorId: user.id,
    action: "child.lesson.complete",
    resource: "Lesson",
    resourceId: lesson.id,
  });

  revalidatePath("/learn");
  revalidatePath("/parent");
  revalidatePath(`/learn/subjects/${input.subjectSlug}`);
  revalidatePath(`/learn/lesson/${input.subjectSlug}/${input.lessonSlug}`);
  return ok({ xp: xpGain });
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
  const xpGain = 5 + input.correct * 3;
  const prevXp = child.learningProfile.xp;
  const skillSlug = `${input.subjectSlug}:foundation`;
  const passed = score >= 60;

  const existing = await prisma.masteryRecord.findUnique({
    where: { childId_skillSlug: { childId: child.id, skillSlug } },
  });
  const newMastery =
    calculateMastery((existing?.masteryScore ?? 30) / 100, passed, 2) * 100;

  await prisma.$transaction([
    prisma.learningProfile.update({
      where: { id: child.learningProfile.id },
      data: {
        xp: { increment: xpGain },
        coins: { increment: passed ? 5 : 1 },
        lastStudyDate: new Date(),
      },
    }),
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

  await maybeOfferQuizReward(child.id, score);
  await maybeOfferReward(child.id, prevXp + xpGain, prevXp);

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
  revalidatePath("/parent");
  revalidatePath(`/parent/children/${child.id}/results`);
  revalidatePath(`/parent/children/${child.id}/certificates`);
  return ok({
    xp: xpGain,
    score,
    passed: attempt.passed,
    certificateCode: attempt.certificateCode,
    attemptId: attempt.id,
  });
}

export async function completeFocusSession(minutes: number): Promise<ActionResult<{ xp: number }>> {
  const user = await requireChild();
  const child = await prisma.childProfile.findFirst({
    where: { userId: user.id },
    include: { learningProfile: true },
  });
  if (!child?.learningProfile) return fail("Child profile not found");

  const xpGain = Math.min(20, minutes * 2);

  await prisma.$transaction([
    prisma.learningProfile.update({
      where: { id: child.learningProfile.id },
      data: { xp: { increment: xpGain }, lastStudyDate: new Date() },
    }),
    prisma.studySession.create({
      data: {
        childId: child.id,
        durationMinutes: minutes,
        focusMode: true,
        completed: true,
      },
    }),
  ]);

  revalidatePath("/learn");
  revalidatePath("/parent");
  return ok({ xp: xpGain });
}
