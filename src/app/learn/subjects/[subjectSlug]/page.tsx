import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import { getSubjectWithLessons } from "@/features/learning/services/curriculum-cache.service";
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
import {
  isLessonUnlocked,
  isTrackLesson,
  lessonUnlockLabel,
  UNLOCK_CAREER_AT,
  UNLOCK_ADVANCED_AT,
  UNLOCK_TRACKS_AT,
} from "@/features/learning/services/lesson-unlock.service";
import { Card, Button, Badge, Alert, ProgressBar } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

function LessonRow({
  lesson,
  subjectSlug,
  childAgeBand,
  sortedLessons,
  completedCount,
  completedSet,
}: {
  lesson: {
    id: string;
    slug: string;
    title: string;
    ageBand: string;
    difficulty: number;
    durationMinutes: number;
  };
  subjectSlug: string;
  childAgeBand: string;
  sortedLessons: { slug: string }[];
  completedCount: number;
  completedSet: Set<string>;
}) {
  const index = sortedLessons.findIndex((l) => l.slug === lesson.slug);
  const unlocked = isLessonUnlocked(lesson.slug, subjectSlug, index, completedCount);
  const lockLabel = lessonUnlockLabel(lesson.slug, subjectSlug, index, completedCount);
  const done = completedSet.has(lesson.slug);

  return (
    <div
      className={[
        styles.quest,
        done ? styles.lessonCompleted : styles.lessonIncomplete,
        !unlocked ? styles.lockedLesson : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div>
        <div className={styles.lessonTitleRow}>
          <strong>{lesson.title}</strong>
          {done ? (
            <Badge variant="success">Completed</Badge>
          ) : unlocked ? (
            <Badge variant="warning">Incomplete</Badge>
          ) : null}
        </div>
        <div className={styles.meta}>
          ~{lesson.durationMinutes} min, Level {lesson.difficulty}, Ages {lesson.ageBand}
          {isTrackLesson(lesson.slug) && (
            <>
              {" "}
             , <Badge>Specialty track</Badge>
            </>
          )}
          {lesson.slug.startsWith("career-") && subjectSlug !== "career-skills" && (
            <>
              {" "}
             , <Badge>Career & business</Badge>
            </>
          )}
          {ageBandProximity(childAgeBand, lesson.ageBand) === 0 && (
            <>
              {" "}
             , <Badge variant="success">Best fit</Badge>
            </>
          )}
        </div>
        {lockLabel && <p className={styles.meta}>{lockLabel}</p>}
      </div>
      {unlocked ? (
        <Link href={`/learn/lesson/${subjectSlug}/${lesson.slug}`}>
          <Button size="sm">{done ? "Again" : "Start"}</Button>
        </Link>
      ) : (
        <Button size="sm" disabled>
          Locked
        </Button>
      )}
    </div>
  );
}

export default async function LearnSubjectPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const user = await requireChild();
  const { subjectSlug } = await params;
  const child = await getLearnChildByUserId(user.id);
  if (!child) redirect("/child-sign-in");

  const [subject, completedCount, completedSlugs] = await Promise.all([
    getSubjectWithLessons(subjectSlug),
    getSubjectCompletionCount(child.id, subjectSlug),
    getCompletedLessonSlugs(child.id, subjectSlug),
  ]);
  if (!subject) notFound();

  const sortedLessons = [...subject.lessons].sort(
    (a, b) =>
      ageBandProximity(child.ageBand, a.ageBand) - ageBandProximity(child.ageBand, b.ageBand) ||
      a.difficulty - b.difficulty,
  );
  const lessons = filterContentForAge(sortedLessons, child.ageBand);
  const sections = buildLessonSections(lessons, subjectSlug, sortedLessons);
  const completedSet = new Set(completedSlugs);
  const visibleCompleted = lessons.filter((l) => completedSet.has(l.slug)).length;

  const rowProps = {
    subjectSlug,
    childAgeBand: child.ageBand,
    sortedLessons,
    completedCount,
    completedSet,
  };

  return (
    <>
      <Link href="/learn/subjects">
        <Button variant="ghost" size="sm">
          ← All subjects
        </Button>
      </Link>
      <header className={styles.pageHeader}>
        <h1>{subject.title}</h1>
        <p className={styles.pageSubtitle}>{subject.description}</p>
        <p className={styles.meta}>
          {visibleCompleted} of {lessons.length} lessons completed on your path, {ageBandLabel(child.ageBand)}{" "}
         , Complete {UNLOCK_TRACKS_AT} foundation lessons for specialty tracks, {UNLOCK_ADVANCED_AT}{" "}
          advanced, {UNLOCK_CAREER_AT} career
        </p>
        {lessons.length > 0 && (
          <ProgressBar
            value={visibleCompleted}
            max={lessons.length}
            label="Subject progress"
          />
        )}
      </header>

      <div className={styles.childActions}>
        <Link href={`/learn/guide/${subject.slug}`}>
          <Button variant="secondary" size="sm">
            Study guide
          </Button>
        </Link>
        <Link href={`/learn/quiz/${subject.slug}`}>
          <Button variant="secondary" size="sm">
            Take quiz
          </Button>
        </Link>
      </div>

      {sections.map((section) => (
        <section key={section.kind + section.title} className={styles.section}>
          <h2>{section.title}</h2>
          {section.kind === "tracks" ? (
            section.groups.map((group) => (
              <div key={group.trackSlug} className={styles.trackGroup}>
                <div className={styles.trackHeader}>
                  <h3>{group.title}</h3>
                  <Badge>{group.category}</Badge>
                </div>
                <div className={styles.questList}>
                  {group.lessons.map((lesson) => (
                    <LessonRow key={lesson.id} lesson={lesson} {...rowProps} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.questList}>
              {section.lessons.map((lesson) => (
                <LessonRow key={lesson.id} lesson={lesson} {...rowProps} />
              ))}
            </div>
          )}
        </section>
      ))}

      {completedCount >= UNLOCK_TRACKS_AT && (
        <Alert variant="success" title="Specialty tracks unlocked">
          Python, web dev, science branches, and more, explore your specialty tracks above!
        </Alert>
      )}

      {completedCount >= UNLOCK_CAREER_AT && (
        <Alert variant="success" title="Career pack unlocked">
          You unlocked career & business lessons in this subject. Great work!
        </Alert>
      )}
    </>
  );
}
