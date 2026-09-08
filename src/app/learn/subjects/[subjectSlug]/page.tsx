import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import {
  getCompletedLessonSlugs,
  getSubjectCompletionCount,
} from "@/features/learning/services/lesson-progress.service";
import { ageBandProximity } from "@/data/age-bands";
import {
  filterContentForAge,
  ageBandLabel,
} from "@/features/learning/services/age-content.service";
import { buildLessonSections } from "@/features/learning/services/lesson-grouping.service";
import type { LessonRow } from "@/features/learning/services/lesson-grouping.service";
import { ALL_CURRICULUM_SUBJECTS } from "@/data/curriculum";
import {
  isLessonUnlocked,
  lessonUnlockLabel,
  UNLOCK_CAREER_AT,
  UNLOCK_TRACKS_AT,
} from "@/features/learning/services/lesson-unlock.service";
import s from "@/features/learning/ui/SubjectCards.module.css";

export default async function LearnSubjectPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const user = await requireChild();
  const { subjectSlug } = await params;
  const child = await getLearnChildByUserId(user.id);
  if (!child) redirect("/child-sign-in");

  const curriculumSubject = ALL_CURRICULUM_SUBJECTS.find((s) => s.slug === subjectSlug);
  if (!curriculumSubject) notFound();

  const [completedCount, completedSlugs] = await Promise.all([
    getSubjectCompletionCount(child.id, subjectSlug),
    getCompletedLessonSlugs(child.id, subjectSlug),
  ]);

  const sortedLessons = [...curriculumSubject.lessons].sort(
    (a, b) =>
      ageBandProximity(child.ageBand, a.ageBand) - ageBandProximity(child.ageBand, b.ageBand) ||
      a.difficulty - b.difficulty,
  );
  const lessons = filterContentForAge(sortedLessons, child.ageBand).map((l) => ({
    ...l,
    id: l.slug,
  }));
  const sections = buildLessonSections(lessons, subjectSlug, sortedLessons.map((l) => ({ ...l, id: l.slug })));
  const completedSet = new Set(completedSlugs);
  const visibleCompleted = lessons.filter((l) => completedSet.has(l.slug)).length;
  const progressPct =
    lessons.length > 0 ? Math.min(100, Math.round((visibleCompleted / lessons.length) * 100)) : 0;

  return (
    <>
      {/* ── DARK HERO BANNER ─────────────────────────────────────── */}
      <div className={s.lessonPageHero}>
        <Link href="/learn/subjects" className={s.lessonHeroBack}>
          ← All subjects
        </Link>
        <h1 className={s.lessonHeroTitle}>{curriculumSubject.title}</h1>
        <p className={s.lessonHeroSub}>{curriculumSubject.description}</p>
        <div className={s.lessonHeroStats}>
          <span className={s.heroPill}>📚 {lessons.length} lessons</span>
          <span className={s.heroPill}>✅ {visibleCompleted} done</span>
          <span className={s.heroPill}>🎯 Ages {ageBandLabel(child.ageBand)}</span>
          {completedCount >= UNLOCK_TRACKS_AT && (
            <span className={s.heroPill} style={{ background: "rgba(16,185,129,0.25)", borderColor: "rgba(16,185,129,0.4)" }}>
              🔓 Tracks unlocked
            </span>
          )}
        </div>
        {lessons.length > 0 && (
          <div className={s.lessonProgressBar}>
            <div className={s.progressTrack}>
              <div className={s.progressFillLight} style={{ width: `${progressPct}%` }} />
            </div>
            <p className={s.progressText}>{progressPct}% complete · {visibleCompleted} of {lessons.length} lessons</p>
          </div>
        )}
      </div>

      {/* ── QUICK ACTIONS ────────────────────────────────────────── */}
      <div className={s.quickActions}>
        <Link href={`/learn/guide/${subjectSlug}`} className={s.quickActionBtn}>
          📖 Study guide
        </Link>
        <Link href={`/learn/videos/${subjectSlug}`} className={s.quickActionBtn}>
          🎬 Videos
        </Link>
        <Link href={`/learn/quiz/${subjectSlug}`} className={s.quickActionBtn}>
          🧠 Quiz
        </Link>
      </div>

      {/* ── UNLOCK BANNERS ───────────────────────────────────────── */}
      {completedCount >= UNLOCK_TRACKS_AT && (
        <div className={s.unlockBanner}>
          <span className={s.unlockBannerIcon}>🌟</span>
          <div className={s.unlockBannerText}>
            <strong>Specialty tracks unlocked!</strong>
            <span>Python, web dev, science branches and more — explore your specialty tracks below.</span>
          </div>
        </div>
      )}
      {completedCount >= UNLOCK_CAREER_AT && (
        <div className={s.unlockBanner}>
          <span className={s.unlockBannerIcon}>🚀</span>
          <div className={s.unlockBannerText}>
            <strong>Career pack unlocked!</strong>
            <span>You&apos;ve earned access to career &amp; business lessons in this subject.</span>
          </div>
        </div>
      )}

      {/* ── LESSON SECTIONS ──────────────────────────────────────── */}
      {sections.map((section) => {
        if (section.kind === "tracks") {
          return (
            <div key="tracks" className={s.lessonSectionBlock}>
              <div className={s.lessonSectionHeading}>
                <span className={s.lessonSectionLabel}>🛤️ {section.title}</span>
                <span className={s.lessonSectionDivider} />
              </div>
              {section.groups.map((group) => (
                <div key={group.trackSlug} className={s.trackGroup}>
                  <div className={s.trackGroupHeader}>
                    <h3 className={s.trackGroupTitle}>{group.title}</h3>
                    <span className={s.trackGroupCategory}>{group.category}</span>
                  </div>
                  <div className={s.trackGroupLessons}>
                    {group.lessons.map((lesson, i) => (
                      <LessonCard
                        key={lesson.slug}
                        lesson={lesson}
                        subjectSlug={subjectSlug}
                        sortIndex={sortedLessons.findIndex((l) => l.slug === lesson.slug)}
                        completedCount={completedCount}
                        completedSet={completedSet}
                        isFirst={i === 0 && completedSet.size === 0}
                        tag="track"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        const sectionIcon =
          section.kind === "foundation" ? "📗" :
          section.kind === "advanced" ? "🔥" : "💼";

        const lessons =
          section.kind === "foundation" || section.kind === "advanced" || section.kind === "career"
            ? section.lessons
            : [];

        const tag =
          section.kind === "foundation" ? "foundation" :
          section.kind === "advanced" ? "advanced" : "career";

        return (
          <div key={section.kind} className={s.lessonSectionBlock}>
            <div className={s.lessonSectionHeading}>
              <span className={s.lessonSectionLabel}>{sectionIcon} {section.title}</span>
              <span className={s.lessonSectionCount}>{lessons.length}</span>
              <span className={s.lessonSectionDivider} />
            </div>
            <div className={s.lessonList}>
              {lessons.map((lesson, i) => (
                <LessonCard
                  key={lesson.slug}
                  lesson={lesson}
                  subjectSlug={subjectSlug}
                  sortIndex={sortedLessons.findIndex((l) => l.slug === lesson.slug)}
                  completedCount={completedCount}
                  completedSet={completedSet}
                  isFirst={section.kind === "foundation" && i === 0 && completedSet.size === 0}
                  tag={tag as "foundation" | "advanced" | "career"}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <span style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((d) => (
        <span
          key={d}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: d <= level ? "#6366f1" : "#e2e8f0",
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}

function LessonCard({
  lesson,
  subjectSlug,
  sortIndex,
  completedCount,
  completedSet,
  isFirst,
  tag,
}: {
  lesson: LessonRow;
  subjectSlug: string;
  sortIndex: number;
  completedCount: number;
  completedSet: Set<string>;
  isFirst: boolean;
  tag: "foundation" | "advanced" | "track" | "career";
}) {
  const isDone = completedSet.has(lesson.slug);
  const unlocked = isLessonUnlocked(lesson.slug, subjectSlug, sortIndex, completedCount);
  const lockMsg = lessonUnlockLabel(lesson.slug, subjectSlug, sortIndex, completedCount);
  const isActive = !isDone && unlocked && isFirst;

  const cardClass = [
    s.lessonRowCard,
    isDone ? s.completed : "",
    !unlocked ? s.locked : "",
    isActive ? s.activelesson : "",
  ]
    .filter(Boolean)
    .join(" ");

  const statusIcon = isDone ? (
    <span className={[s.lessonStatusIcon, s.statusIconCompleted].join(" ")}>✓</span>
  ) : !unlocked ? (
    <span className={[s.lessonStatusIcon, s.statusIconLocked].join(" ")}>🔒</span>
  ) : isActive ? (
    <span className={[s.lessonStatusIcon, s.statusIconActive].join(" ")}>▶</span>
  ) : (
    <span className={[s.lessonStatusIcon, s.statusIconReady].join(" ")}>○</span>
  );

  const tagClass =
    tag === "foundation" ? s.tagFoundation :
    tag === "advanced" ? s.tagAdvanced :
    tag === "track" ? s.tagTrack : s.tagCareer;

  const tagLabel =
    tag === "foundation" ? "Foundation" :
    tag === "advanced" ? "Advanced" :
    tag === "track" ? "Track" : "Career";

  return (
    <div className={cardClass}>
      {statusIcon}
      <div className={s.lessonRowInfo}>
        <p className={s.lessonRowTitle}>{lesson.title}</p>
        <div className={s.lessonRowMeta}>
          <span className={[s.lessonTag, tagClass].join(" ")}>{tagLabel}</span>
          <span>~{lesson.durationMinutes} min</span>
          <DifficultyDots level={lesson.difficulty} />
          <span>Ages {lesson.ageBand}</span>
        </div>
        {lockMsg && <p className={s.lockLabel}>{lockMsg}</p>}
      </div>
      <div className={s.lessonRowAction}>
        {unlocked ? (
          <Link
            href={`/learn/lesson/${subjectSlug}/${lesson.slug}`}
            className={isDone ? s.reviewBtn : s.startBtn}
          >
            {isDone ? "Review" : "Start →"}
          </Link>
        ) : (
          <span className={s.reviewBtn} style={{ opacity: 0.5, cursor: "not-allowed" }}>
            Locked
          </span>
        )}
      </div>
    </div>
  );
}


