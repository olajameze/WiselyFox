"use client";

import { useState } from "react";
import Link from "next/link";
import { isLessonUnlocked, lessonUnlockLabel } from "@/features/learning/services/lesson-unlock.service";
import styles from "./FoxTrailMap.module.css";

interface LessonItem {
  id: string;
  slug: string;
  title: string;
  ageBand: string;
  difficulty: number;
  durationMinutes: number;
}

interface FoxTrailMapProps {
  subjectSlug: string;
  subjectTitle: string;
  subjectIcon?: string;
  lessons: LessonItem[];
  completedSlugs: string[];
  completedCount: number;
  childAgeBand: string;
}

const WINDING_OFFSETS = [
  styles.offsetCenter,
  styles.offsetLeft,
  styles.offsetFarLeft,
  styles.offsetLeft,
  styles.offsetCenter,
  styles.offsetRight,
  styles.offsetFarRight,
  styles.offsetRight,
];

export function FoxTrailMap({
  subjectSlug,
  subjectTitle,
  subjectIcon = "🦊",
  lessons,
  completedSlugs,
  completedCount,
  childAgeBand,
}: FoxTrailMapProps) {
  const [viewMode, setViewMode] = useState<"trail" | "syllabus">("trail");
  const completedSet = new Set(completedSlugs);

  // Find the first unlocked incomplete lesson as the active target
  let activeFound = false;
  const lessonStatuses = lessons.map((lesson, index) => {
    const isUnlocked = isLessonUnlocked(lesson.slug, subjectSlug, index, completedCount);
    const isCompleted = completedSet.has(lesson.slug);
    const isActive = isUnlocked && !isCompleted && !activeFound;
    if (isActive) activeFound = true;
    const lockText = lessonUnlockLabel(lesson.slug, subjectSlug, index, completedCount);

    return {
      lesson,
      index,
      isUnlocked,
      isCompleted,
      isActive,
      lockText,
    };
  });

  const percent =
    lessons.length > 0
      ? Math.min(100, Math.round((completedSet.size / lessons.length) * 100))
      : 0;

  return (
    <div className={styles.trailContainer}>
      {/* Codecademy-inspired View Switcher & Subject Header */}
      <div className={styles.viewToggleBar}>
        <div className={styles.subjectMetaHeader}>
          <h1 className={styles.subjectTitle}>
            <span>{subjectIcon}</span>
            <span>{subjectTitle}</span>
          </h1>
          <p className={styles.subjectProgressSub}>
            {completedSet.size} of {lessons.length} lessons completed ({percent}%) • Ages {childAgeBand}
          </p>
        </div>

        <div className={styles.toggleButtonGroup} role="tablist" aria-label="Learning view switch">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "trail"}
            className={[
              styles.toggleBtn,
              viewMode === "trail" ? styles.toggleBtnActive : "",
            ].join(" ")}
            onClick={() => setViewMode("trail")}
          >
            🗺️ Trail
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "syllabus"}
            className={[
              styles.toggleBtn,
              viewMode === "syllabus" ? styles.toggleBtnActive : "",
            ].join(" ")}
            onClick={() => setViewMode("syllabus")}
          >
            📋 Syllabus
          </button>
        </div>
      </div>

      {viewMode === "trail" ? (
        /* ── DUOLINGO + MIMO WINDING PATH VIEW ────────────────────────── */
        <div className={styles.trailNodes}>
          {lessonStatuses.map(({ lesson, index, isUnlocked, isCompleted, isActive, lockText }) => {
            const offsetClass = WINDING_OFFSETS[index % WINDING_OFFSETS.length];
            const isUnitMilestone = index === 0 || index % 4 === 0;
            const unitNumber = Math.floor(index / 4) + 1;

            let icon = "⭐";
            if (isCompleted) icon = "✓";
            else if (!isUnlocked) icon = "🔒";
            else if (index === 0) icon = "🦊";
            else if (index === lessons.length - 1) icon = "🏆";
            else if (index % 3 === 0) icon = "📖";

            return (
              <div key={lesson.slug} style={{ width: "100%" }}>
                {isUnitMilestone && (
                  <div className={styles.unitBanner}>
                    <div className={styles.unitMeta}>
                      <span className={styles.unitTag}>Unit {unitNumber}</span>
                      <h2 className={styles.unitHeading}>
                        {index === 0
                          ? "Foundations of Wisdom"
                          : `Milestone Challenge ${unitNumber}`}
                      </h2>
                    </div>
                    <span className={styles.unitBadge} aria-hidden="true">
                      {unitNumber === 1 ? "🦊" : unitNumber === 2 ? "🌿" : "🌟"}
                    </span>
                  </div>
                )}

                <div className={[styles.trailRow, offsetClass].join(" ")}>
                  <div className={styles.nodeWrapper}>
                    {isActive && (
                      <div className={styles.foxPointer}>
                        <span>Start here! 🦊</span>
                      </div>
                    )}

                    {isUnlocked ? (
                      <Link
                        href={`/learn/lesson/${subjectSlug}/${lesson.slug}`}
                        className={[
                          styles.stoneNode,
                          isActive
                            ? styles.nodeActive
                            : isCompleted
                              ? styles.nodeCompleted
                              : styles.nodeActive,
                        ].join(" ")}
                        title={lesson.title}
                        aria-label={`${lesson.title} - ${isCompleted ? "Completed" : "Start"}`}
                      >
                        <span aria-hidden="true">{icon}</span>
                      </Link>
                    ) : (
                      <div
                        className={[styles.stoneNode, styles.nodeLocked].join(" ")}
                        title={lockText || "Complete previous lesson to unlock"}
                        aria-label={`${lesson.title} - Locked`}
                      >
                        <span aria-hidden="true">🔒</span>
                      </div>
                    )}

                    <span className={styles.nodeLabel}>{lesson.title}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── CODECADEMY STRUCTURED SYLLABUS VIEW ─────────────────────── */
        <div className={styles.syllabusContainer}>
          {lessonStatuses.map(({ lesson, isUnlocked, isCompleted, lockText }) => (
            <div key={lesson.slug} className={styles.syllabusCard}>
              <div className={styles.syllabusInfo}>
                <div className={styles.syllabusTitleRow}>
                  <h3 className={styles.syllabusTitle}>{lesson.title}</h3>
                </div>
                <div className={styles.syllabusMeta}>
                  <span>⏱️ ~{lesson.durationMinutes} mins</span>
                  <span>•</span>
                  <span>⚡ Level {lesson.difficulty}</span>
                  <span>•</span>
                  <span>Ages {lesson.ageBand}</span>
                  {lockText && <span style={{ color: "#e05638" }}>• {lockText}</span>}
                </div>
              </div>

              <div className={styles.syllabusAction}>
                {isUnlocked ? (
                  <Link
                    href={`/learn/lesson/${subjectSlug}/${lesson.slug}`}
                    className={[
                      styles.tactileBtn,
                      isCompleted ? styles.tactileBtnSuccess : styles.tactileBtnPrimary,
                    ].join(" ")}
                  >
                    {isCompleted ? "Practice Again" : "Start Lesson"}
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    className={[styles.tactileBtn, styles.tactileBtnLocked].join(" ")}
                  >
                    Locked
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

