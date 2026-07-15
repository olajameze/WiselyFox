import { PrismaClient, ConsentType, PlanTier, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ALL_CURRICULUM_SUBJECTS } from "../src/data/curriculum";
import {
  getAllLessonsForSubject,
  getAllQuestionsForSubject,
  getResolvedAgeBands,
} from "../src/data/curriculum-merge";
import { enhanceLessonStepsForHandsOn } from "../src/data/lesson-hands-on";
import { enhanceLessonDepth } from "../src/data/lesson-depth";
import { enrichLessonSteps } from "../src/data/lesson-enrichment";
import { DEFAULT_SCHEDULE } from "../src/features/parent/services/schedule.service";
import { DEMO_CHILD_ACCESS_CODE } from "../src/shared/lib/demo-credentials";

const prisma = new PrismaClient();

async function main() {
  const adminHash = await bcrypt.hash("admin123456", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@wiselyfox.test" },
    update: {},
    create: {
      email: "admin@wiselyfox.test",
      name: "Super Admin",
      passwordHash: adminHash,
      role: UserRole.SUPERADMIN,
      parentProfile: { create: {} },
    },
  });

  const demoParentHash = await bcrypt.hash("demo123456", 10);
  const trialEnds = new Date();
  trialEnds.setDate(trialEnds.getDate() + 12);

  const demoParent = await prisma.user.upsert({
    where: { email: "parent@demo.wiselyfox.test" },
    update: { name: "Demo Parent" },
    create: {
      email: "parent@demo.wiselyfox.test",
      name: "Demo Parent",
      passwordHash: demoParentHash,
      role: UserRole.PARENT,
      parentProfile: {
        create: {
          onboardingDone: true,
          subscription: {
            create: {
              plan: PlanTier.FAMILY,
              status: "TRIALING",
              trialStartsAt: new Date(),
              trialEndsAt: trialEnds,
            },
          },
          consents: {
            create: [
              { type: ConsentType.TERMS, granted: true, version: "1.0" },
              { type: ConsentType.PRIVACY, granted: true, version: "1.0" },
              { type: ConsentType.CHILD_DATA, granted: true, version: "1.0" },
            ],
          },
        },
      },
    },
    include: { parentProfile: true },
  });

  const parentProfile = demoParent.parentProfile!;
  await prisma.parentProfile.update({
    where: { id: parentProfile.id },
    data: { onboardingDone: true },
  });
  const childPinHash = await bcrypt.hash("1234", 10);
  const childUser = await prisma.user.upsert({
    where: { id: "demo-child-user" },
    update: { name: "Alex" },
    create: {
      id: "demo-child-user",
      name: "Alex",
      role: UserRole.CHILD,
    },
  });

  const demoChild = await prisma.childProfile.upsert({
    where: { accessCode: DEMO_CHILD_ACCESS_CODE },
    update: {
      displayName: "Alex",
      pinHash: childPinHash,
    },
    create: {
      parentId: parentProfile.id,
      userId: childUser.id,
      displayName: "Alex",
      ageBand: "8-10",
      yearGroup: "4",
      accessCode: DEMO_CHILD_ACCESS_CODE,
      pinHash: childPinHash,
      interests: JSON.stringify(["space", "animals"]),
      learningProfile: {
        create: {
          learningNeeds: JSON.stringify(["ADHD"]),
          sessionLengthMinutes: 15,
          levelScore: 62,
          streakDays: 5,
          xp: 340,
          coins: 45,
          lastStudyDate: new Date(),
        },
      },
    },
    include: { learningProfile: true },
  });

  for (const record of [
    { skillSlug: "maths:foundation", masteryScore: 72, attempts: 8 },
    { skillSlug: "reading:foundation", masteryScore: 58, attempts: 5 },
    { skillSlug: "coding:foundation", masteryScore: 41, attempts: 3 },
  ]) {
    await prisma.masteryRecord.upsert({
      where: { childId_skillSlug: { childId: demoChild.id, skillSlug: record.skillSlug } },
      update: record,
      create: { childId: demoChild.id, ...record },
    });
  }

  const sessionCount = await prisma.studySession.count({ where: { childId: demoChild.id } });
  if (sessionCount === 0) {
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(now);
      day.setDate(day.getDate() - i);
      day.setHours(16, 0, 0, 0);
      await prisma.studySession.create({
        data: {
          childId: demoChild.id,
          durationMinutes: 10 + i * 3,
          focusMode: i % 2 === 0,
          startedAt: day,
          endedAt: new Date(day.getTime() + (10 + i * 3) * 60 * 1000),
        },
      });
    }
  }

  const streakReward = await prisma.reward.findFirst({
    where: { childId: demoChild.id, title: "5 day streak star" },
  });
  if (!streakReward) {
    await prisma.reward.create({
      data: {
        childId: demoChild.id,
        type: "streak",
        title: "5 day streak star",
        description: "Studied five days in a row, pick a small celebration with a parent",
        approved: true,
      },
    });
  }

  const pendingXpReward = await prisma.reward.findFirst({
    where: { childId: demoChild.id, title: "15 minutes extra screen time" },
  });
  if (!pendingXpReward) {
    await prisma.reward.create({
      data: {
        childId: demoChild.id,
        type: "milestone",
        title: "15 minutes extra screen time",
        description: "Approved leisure time, earned at 100 XP",
        approved: false,
      },
    });
  }

  if (demoChild.learningProfile) {
    await prisma.learningProfile.update({
      where: { id: demoChild.learningProfile.id },
      data: {
        streakDays: 5,
        lastStudyDate: new Date(),
      },
    });
  }

  const assessmentCount = await prisma.assessment.count({ where: { childId: demoChild.id } });
  if (assessmentCount === 0) {
    await prisma.assessment.create({
      data: {
        childId: demoChild.id,
        type: "entrance",
        responses: JSON.stringify({ completed: true }),
        scores: JSON.stringify({ maths: 62, reading: 58, coding: 41 }),
        levelResult: "Developing",
      },
    });
  }

  const scheduleCount = await prisma.learningScheduleItem.count({
    where: { childId: demoChild.id },
  });
  if (scheduleCount === 0) {
    await prisma.learningScheduleItem.createMany({
      data: DEFAULT_SCHEDULE.map((item, sortOrder) => ({
        childId: demoChild.id,
        dayOfWeek: item.dayOfWeek,
        title: item.title,
        subject: item.subject,
        timeLabel: item.timeLabel,
        sortOrder,
      })),
    });
  }

  const notifCount = await prisma.notification.count({ where: { userId: demoParent.id } });
  if (notifCount === 0) {
    await prisma.notification.createMany({
    data: [
      {
        userId: demoParent.id,
        type: "LEARNING",
        title: "Alex completed a lesson",
        body: "Alex finished Introduction to Mathematics and earned 15 XP.",
      },
      {
        userId: demoParent.id,
        type: "TRIAL_REMINDER",
        title: "12 days left in your trial",
        body: "Your free trial ends soon. Manage billing in Settings when you're ready.",
        read: false,
      },
      {
        userId: demoParent.id,
        type: "ACHIEVEMENT",
        title: "New streak milestone",
        body: "Alex reached a 5-day learning streak!",
      },
    ],
    });
  }

  const flaggedHash = await bcrypt.hash("demo123456", 10);
  const flaggedUser = await prisma.user.upsert({
    where: { email: "suspicious@demo.wiselyfox.test" },
    update: {},
    create: {
      email: "suspicious@demo.wiselyfox.test",
      name: "Flagged User",
      passwordHash: flaggedHash,
      role: UserRole.PARENT,
      parentProfile: { create: {} },
    },
    include: { parentProfile: true },
  });

  const existingFraud = await prisma.fraudSignal.findFirst({
    where: { parentId: flaggedUser.parentProfile!.id, signal: "signup_risk" },
  });
  if (!existingFraud) {
    await prisma.fraudSignal.create({
      data: {
        parentId: flaggedUser.parentProfile!.id,
        signal: "signup_risk",
        score: 65,
        status: "REVIEW",
      },
    });
  }

  const insightCount = await prisma.aggregatedInsight.count();
  if (insightCount === 0) {
    const now = new Date();
    await prisma.aggregatedInsight.create({
    data: {
      reportType: "weekly_engagement",
      ageBand: "8-10",
      cohortSize: 42,
      periodStart: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      periodEnd: now,
      data: JSON.stringify({
        avgSessionMinutes: 14.2,
        completionRate: 0.78,
        topSubjects: ["maths", "reading"],
      }),
    },
  });
  }

  for (const subject of ALL_CURRICULUM_SUBJECTS) {
    const allLessons = getAllLessonsForSubject(subject);
    const ageBands = getResolvedAgeBands(subject);
    const allQuestions = getAllQuestionsForSubject(subject);

    const dbSubject = await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: {
        title: subject.title,
        description: subject.description,
        ageBands: JSON.stringify(ageBands),
      },
      create: {
        slug: subject.slug,
        title: subject.title,
        description: subject.description,
        ageBands: JSON.stringify(ageBands),
      },
    });

    const skill = await prisma.skill.upsert({
      where: { subjectId_slug: { subjectId: dbSubject.id, slug: "foundation" } },
      update: { title: "Foundation skills" },
      create: {
        subjectId: dbSubject.id,
        slug: "foundation",
        title: "Foundation skills",
        level: 1,
      },
    });

    for (const lesson of allLessons) {
      const steps = enhanceLessonStepsForHandsOn(
        subject.slug,
        lesson,
        enhanceLessonDepth(subject.slug, lesson.slug, enrichLessonSteps(subject.slug, lesson)),
      );
      await prisma.lesson.upsert({
        where: { subjectId_slug: { subjectId: dbSubject.id, slug: lesson.slug } },
        update: {
          title: lesson.title,
          content: JSON.stringify({ steps }),
          ageBand: lesson.ageBand,
          difficulty: lesson.difficulty,
          durationMinutes: lesson.durationMinutes,
          accommodationTags: JSON.stringify(["short-text", "step-by-step"]),
        },
        create: {
          subjectId: dbSubject.id,
          slug: lesson.slug,
          title: lesson.title,
          content: JSON.stringify({ steps }),
          ageBand: lesson.ageBand,
          difficulty: lesson.difficulty,
          durationMinutes: lesson.durationMinutes,
          accommodationTags: JSON.stringify(["short-text", "step-by-step"]),
        },
      });
    }

    await prisma.question.deleteMany({ where: { skillId: skill.id } });
    for (const q of allQuestions) {
      await prisma.question.create({
        data: {
          skillId: skill.id,
          type: "multiple_choice",
          prompt: q.prompt,
          options: JSON.stringify(q.options),
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          difficulty: q.difficulty,
          ageBand: q.ageBand,
        },
      });
    }
  }

  console.log("Seeded admin:", admin.email, "/ admin123456");
  console.log("Seeded demo parent:", demoParent.email, "/ demo123456");
  console.log("Seeded demo child access code:", DEMO_CHILD_ACCESS_CODE, "/ PIN 1234");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
