import { prisma } from "@/shared/lib/prisma";
import {
  deriveMasteryTrend,
  type TutorLearnerProgress,
} from "@/features/tutors/lib/tutor-progress-allowlist";
import { getAdaptiveRecommendations } from "@/features/learning/services/learning-path.service";
import { assertTutorStudentAccess } from "@/shared/lib/permissions";

export async function getTutorStudentAccessList(tutorUserId: string) {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId: tutorUserId },
    select: { id: true },
  });
  if (!tutor) return [];

  const rows = await prisma.tutorStudentAccess.findMany({
    where: { tutorProfileId: tutor.id, status: "ACTIVE" },
    orderBy: { grantedAt: "desc" },
  });

  const ageBands = await prisma.childProfile.findMany({
    where: { id: { in: rows.map((r) => r.childId) } },
    select: { id: true, ageBand: true },
  });
  const ageBandMap = new Map(ageBands.map((c) => [c.id, c.ageBand]));

  return rows.map((row) => ({
    id: row.id,
    learnerAlias: row.learnerAlias,
    ageBand: ageBandMap.get(row.childId) ?? "unknown",
    grantedAt: row.grantedAt,
    source: row.source,
  }));
}

export async function getTutorLearnerProgress(
  tutorUserId: string,
  accessId: string,
): Promise<TutorLearnerProgress> {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId: tutorUserId },
    select: { id: true },
  });
  if (!tutor) throw new Error("Tutor not found");

  const access = await prisma.tutorStudentAccess.findFirst({
    where: { id: accessId, tutorProfileId: tutor.id, status: "ACTIVE" },
  });
  if (!access) throw new Error("Access not found");

  await assertTutorStudentAccess(tutorUserId, access.childId);

  const childId = access.childId;

  const [learningProfile, masteryRecords, quizAttempts, subjectCompletions, lessonCount, assessment, studySessions] =
    await Promise.all([
      prisma.learningProfile.findUnique({ where: { childId } }),
      prisma.masteryRecord.findMany({ where: { childId } }),
      prisma.quizAttempt.findMany({
        where: { childId },
        orderBy: { completedAt: "desc" },
        take: 20,
      }),
      prisma.subjectCompletion.findMany({
        where: { childId },
        orderBy: { completedAt: "desc" },
      }),
      prisma.lessonCompletion.count({ where: { childId } }),
      prisma.assessment.findFirst({
        where: { childId },
        orderBy: { completedAt: "desc" },
        select: { levelResult: true, scores: true, completedAt: true },
      }),
      prisma.studySession.findMany({
        where: {
          childId,
          startedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
        select: { durationMinutes: true },
      }),
    ]);

  const childMeta = await prisma.childProfile.findUnique({
    where: { id: childId },
    select: { ageBand: true },
  });

  const subjectMasteryMap = new Map<string, number[]>();
  for (const record of masteryRecords) {
    const subject = record.skillSlug.split(":")[0] ?? record.skillSlug;
    const list = subjectMasteryMap.get(subject) ?? [];
    list.push(record.masteryScore);
    subjectMasteryMap.set(subject, list);
  }

  const subjectMastery = Array.from(subjectMasteryMap.entries()).map(([subject, scores]) => {
    const mastery = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return { subject, mastery, trend: deriveMasteryTrend(mastery) };
  });

  const strengths = subjectMastery.filter((s) => s.mastery >= 70).map((s) => s.subject);
  const needsImprovement = subjectMastery.filter((s) => s.mastery < 50).map((s) => s.subject);

  let recommendations: TutorLearnerProgress["recommendations"] = [];
  try {
    const recs = await getAdaptiveRecommendations(childId);
    recommendations = recs.slice(0, 5).map((r) => ({
      lessonTitle: r.lessonTitle,
      reason: r.reason,
    }));
  } catch {
    recommendations = [];
  }

  const weeklyStudyMinutes = studySessions.reduce((sum, s) => sum + s.durationMinutes, 0);

  let levelLabel = "Not assessed";
  if (assessment?.levelResult) {
    levelLabel = assessment.levelResult;
  }

  return {
    learnerAlias: access.learnerAlias,
    ageBand: childMeta?.ageBand ?? "unknown",
    levelLabel,
    levelScore: learningProfile?.levelScore ?? 0,
    subjectMastery,
    quizHistory: quizAttempts.map((q) => ({
      subjectTitle: q.subjectTitle,
      score: q.score,
      passed: q.passed,
      completedAt: q.completedAt.toISOString(),
    })),
    subjectsCompleted: subjectCompletions.map((s) => ({
      subjectTitle: s.subjectTitle,
      completedAt: s.completedAt.toISOString(),
    })),
    lessonsCompletedCount: lessonCount,
    weeklyStudyMinutes,
    strengths,
    needsImprovement,
    recommendations,
  };
}
