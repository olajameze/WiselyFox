import Link from "next/link";
import { redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import {
  subjectMatchesChildAge,
  ageBandLabel,
} from "@/features/learning/services/age-content.service";
import { ALL_CURRICULUM_SUBJECTS } from "@/data/curriculum";
import { getSubjectCompletionCount } from "@/features/learning/services/lesson-progress.service";
import { buildSubjectBoardEntries, type SubjectBoardEntry } from "@/features/learning/lib/subject-board";
import s from "@/features/learning/ui/SubjectCards.module.css";

// Accent colour per category for the top card bar
const CATEGORY_ACCENTS: Record<string, string> = {
  Numbers: "linear-gradient(90deg,#6366f1,#818cf8)",
  Literacy: "linear-gradient(90deg,#f59e0b,#fbbf24)",
  Science: "linear-gradient(90deg,#10b981,#34d399)",
  Humanities: "linear-gradient(90deg,#8b5cf6,#a78bfa)",
  World: "linear-gradient(90deg,#0ea5e9,#38bdf8)",
  Tech: "linear-gradient(90deg,#3b82f6,#60a5fa)",
  STEM: "linear-gradient(90deg,#14b8a6,#2dd4bf)",
  Mind: "linear-gradient(90deg,#ec4899,#f472b6)",
  Thinking: "linear-gradient(90deg,#8b5cf6,#c084fc)",
  Society: "linear-gradient(90deg,#64748b,#94a3b8)",
  Money: "linear-gradient(90deg,#eab308,#facc15)",
  Space: "linear-gradient(90deg,#6366f1,#312e81)",
  Life: "linear-gradient(90deg,#22c55e,#86efac)",
  Matter: "linear-gradient(90deg,#f97316,#fb923c)",
  Energy: "linear-gradient(90deg,#f43f5e,#fb7185)",
  Language: "linear-gradient(90deg,#0d9488,#5eead4)",
  Wellbeing: "linear-gradient(90deg,#84cc16,#bef264)",
  Future: "linear-gradient(90deg,#e05638,#f97316)",
  AI: "linear-gradient(90deg,#7c3aed,#a855f7)",
  Digital: "linear-gradient(90deg,#0284c7,#38bdf8)",
  Skill: "linear-gradient(90deg,#475569,#94a3b8)",
};

export default async function LearnSubjectsPage() {
  const user = await requireChild();
  const child = await getLearnChildByUserId(user.id);
  if (!child) redirect("/child-sign-in");

  const allSubjects = ALL_CURRICULUM_SUBJECTS.filter((s) =>
    subjectMatchesChildAge(
      s.ageBands && s.ageBands.length > 0 ? s.ageBands : [],
      child.ageBand
    ),
  );

  const completionCounts = await Promise.all(
    allSubjects.map(async (subject) => ({
      slug: subject.slug,
      count: await getSubjectCompletionCount(child.id, subject.slug),
    }))
  );

  const completedBySlug = Object.fromEntries(
    completionCounts.map((c) => [c.slug, c.count])
  );

  const subjects = buildSubjectBoardEntries(allSubjects, child.ageBand, completedBySlug);

  const inProgress = subjects.filter((s) => s.status === "In progress");
  const ready = subjects.filter((s) => s.status === "Ready");
  const complete = subjects.filter((s) => s.status === "Complete");

  const totalCompleted = complete.length;
  const totalLessonsCompleted = completionCounts.reduce((acc, c) => acc + c.count, 0);

  return (
    <>
      {/* ── HERO BANNER ──────────────────────────────────────── */}
      <div className={s.pageHero}>
        <div className={s.pageHeroInner}>
          <div className={s.pageHeroIcon}>🦊</div>
          <div className={s.pageHeroText}>
            <h1>Your Learning Journey</h1>
            <p>
              Explore subjects matched to your age ({ageBandLabel(child.ageBand)}).
              Complete lessons to unlock new content and earn rewards!
            </p>
          </div>
        </div>
        <div className={s.pageHeroStats}>
          <div className={s.heroStat}>
            <strong>{subjects.length}</strong>
            <span>Subjects</span>
          </div>
          <div className={s.heroStat}>
            <strong>{totalLessonsCompleted}</strong>
            <span>Lessons done</span>
          </div>
          <div className={s.heroStat}>
            <strong>{inProgress.length}</strong>
            <span>In progress</span>
          </div>
          <div className={s.heroStat}>
            <strong>{totalCompleted}</strong>
            <span>Completed</span>
          </div>
        </div>
      </div>

      {/* ── CONTINUE LEARNING ─────────────────────────────────── */}
      {inProgress.length > 0 && (
        <div className={s.sectionBlock}>
          <div className={s.sectionHeading}>
            <span>🔥 Continue learning</span>
            <span className={s.sectionHeadingLine} />
          </div>
          <div className={s.subjectGrid}>
            {inProgress.map((subject) => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </div>
        </div>
      )}

      {/* ── READY TO START ────────────────────────────────────── */}
      {ready.length > 0 && (
        <div className={s.sectionBlock}>
          <div className={s.sectionHeading}>
            <span>✨ Ready to start</span>
            <span className={s.sectionHeadingLine} />
          </div>
          <div className={s.subjectGrid}>
            {ready.map((subject) => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </div>
        </div>
      )}

      {/* ── COMPLETED ─────────────────────────────────────────── */}
      {complete.length > 0 && (
        <div className={s.sectionBlock}>
          <div className={s.sectionHeading}>
            <span>✅ Completed subjects</span>
            <span className={s.sectionHeadingLine} />
          </div>
          <div className={s.subjectGrid}>
            {complete.map((subject) => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function SubjectCard({ subject }: { subject: SubjectBoardEntry }) {
  const accent =
    CATEGORY_ACCENTS[subject.category] ?? CATEGORY_ACCENTS.Skill;

  const isComplete = subject.status === "Complete";
  const isInProgress = subject.status === "In progress";

  return (
    <div className={s.subjectCard}>
      <div className={s.cardAccentBar} style={{ background: accent }} />
      <div className={s.cardBody}>
        <div className={s.cardIconRow}>
          <span className={s.cardIconEmoji}>{subject.icon}</span>
          <span className={s.categoryPill}>{subject.category}</span>
        </div>
        <h3 className={s.cardTitle}>{subject.title}</h3>
        <p className={s.cardDescription}>{subject.description}</p>

        <div className={s.cardMeta}>
          <span>{subject.lessonsCount} lessons</span>
          <span className={s.metaDot} />
          {isComplete ? (
            <span style={{ color: "#10b981", fontWeight: 700 }}>All done! 🎉</span>
          ) : isInProgress ? (
            <span style={{ color: "#f59e0b", fontWeight: 700 }}>In progress</span>
          ) : (
            <span>Ready to start</span>
          )}
        </div>

        {subject.progress > 0 && (
          <>
            <div className={s.progressTrackSmall}>
              <div className={s.progressFill} style={{ width: `${subject.progress}%` }} />
            </div>
            <p className={s.progressLabel}>{subject.progress}% complete</p>
          </>
        )}

        {isComplete && (
          <div className={s.completionBadge}>✓ All lessons complete!</div>
        )}
      </div>

      <div className={s.cardFooter}>
        <Link
          href={`/learn/subjects/${subject.slug}`}
          className={[s.cardCta, isComplete ? s.cardCtaSecondary : ""].join(" ")}
        >
          {isComplete ? "Review subject" : isInProgress ? "Continue →" : "Start learning"}
        </Link>
      </div>
    </div>
  );
}


