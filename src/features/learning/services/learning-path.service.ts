import { ageBandProximity } from "@/data/age-bands";
import { prisma } from "@/shared/lib/prisma";
import { adjustDifficulty } from "@/features/learning/services/learning-engine.service";

export type LessonRecommendation = {
  subjectSlug: string;
  subjectTitle: string;
  lessonSlug: string;
  lessonTitle: string;
  reason: string;
  href: string;
};

const LEVEL_TO_DIFFICULTY: Record<string, number> = {
  Foundation: 1,
  Emerging: 1,
  Developing: 2,
  Advanced: 3,
};

export async function getAdaptiveRecommendations(
  childId: string,
  limit = 3,
): Promise<LessonRecommendation[]> {
  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    include: {
      learningProfile: true,
      masteryRecords: true,
      assessments: { orderBy: { completedAt: "desc" }, take: 1 },
    },
  });
  if (!child?.learningProfile) return [];

  const latestAssessment = child.assessments[0];
  const levelLabel = latestAssessment?.levelResult ?? "Developing";
  let targetDifficulty = LEVEL_TO_DIFFICULTY[levelLabel] ?? 2;
  targetDifficulty = adjustDifficulty(
    child.learningProfile.levelScore / 100,
    targetDifficulty,
  );

  const subjects = await prisma.subject.findMany({
    where: { published: true },
    include: {
      lessons: {
        where: { published: true },
        orderBy: { difficulty: "asc" },
      },
    },
  });

  const recommendations: LessonRecommendation[] = [];

  for (const subject of subjects) {
    const sortedLessons = [...subject.lessons].sort(
      (a, b) => ageBandProximity(child.ageBand, a.ageBand) - ageBandProximity(child.ageBand, b.ageBand),
    );
    const ageLessons = sortedLessons.filter(
      (l) => ageBandProximity(child.ageBand, l.ageBand) <= 1,
    );
    const pool = ageLessons.length > 0 ? ageLessons : sortedLessons;
    if (pool.length === 0) continue;

    const skillSlug = `${subject.slug}:foundation`;
    const mastery =
      child.masteryRecords.find((m) => m.skillSlug === skillSlug)?.masteryScore ?? 0;

    const candidates = pool.filter((l) => Math.abs(l.difficulty - targetDifficulty) <= 1);
    const lesson =
      candidates.find((l) => mastery < 80 || l.difficulty >= targetDifficulty) ?? pool[0];

    let reason = `Matched to your ${levelLabel.toLowerCase()} level`;
    if (mastery < 50) reason = `Build ${subject.title.toLowerCase()} foundations`;
    else if (mastery >= 80) reason = `Stretch challenge in ${subject.title.toLowerCase()}`;
    else if (mastery >= 50) reason = `Keep growing in ${subject.title.toLowerCase()}`;

    recommendations.push({
      subjectSlug: subject.slug,
      subjectTitle: subject.title,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      reason,
      href: `/learn/lesson/${subject.slug}/${lesson.slug}`,
    });
  }

  return recommendations
    .sort((a, b) => {
      const aM =
        child.masteryRecords.find((m) => m.skillSlug === `${a.subjectSlug}:foundation`)
          ?.masteryScore ?? 0;
      const bM =
        child.masteryRecords.find((m) => m.skillSlug === `${b.subjectSlug}:foundation`)
          ?.masteryScore ?? 0;
      return aM - bM;
    })
    .slice(0, limit);
}
