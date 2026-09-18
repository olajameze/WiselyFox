"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/shared/ui";
import { completeLesson } from "@/features/learning/actions/learning.actions";
import { LEARNING_METHOD_LABELS, LEARNING_METHOD_HINTS } from "@/data/learning-methods";
import type { LessonStep } from "@/data/curriculum";
import { LessonVideoEmbed } from "@/features/learning/ui/LessonVideoEmbed";
import type { AccommodationRules } from "@/features/inclusive/services/accommodation.service";
import styles from "./LessonPlayerTactile.module.css";

export function LessonPlayer({
  subjectSlug,
  lessonSlug,
  title,
  durationMinutes,
  steps,
  calm,
  alreadyCompleted = false,
  chunkSize = "medium",
  showTimer = true,
  celebrationIntensity = "medium",
  showVisualSchedule = false,
  breakEveryMinutes = null,
}: {
  subjectSlug: string;
  lessonSlug: string;
  title: string;
  durationMinutes: number;
  steps: LessonStep[];
  calm?: boolean;
  alreadyCompleted?: boolean;
  chunkSize?: AccommodationRules["chunkSize"];
  showTimer?: boolean;
  celebrationIntensity?: AccommodationRules["celebrationIntensity"];
  showVisualSchedule?: boolean;
  breakEveryMinutes?: number | null;
}) {
  const [step, setStep] = useState(0);
  const [contentChunk, setContentChunk] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState<string | null>(null);
  const [checkPassed, setCheckPassed] = useState(false);
  const [tipRevealed, setTipRevealed] = useState(false);
  const [factsChecked, setFactsChecked] = useState<Record<number, boolean>>({});
  const [instructionsChecked, setInstructionsChecked] = useState<Record<number, boolean>>({});
  const [stepReady, setStepReady] = useState(false);
  const [showBreakAlert, setShowBreakAlert] = useState(false);

  useEffect(() => {
    if (!breakEveryMinutes) return;
    const breakTimer = setTimeout(() => {
      setShowBreakAlert(true);
    }, breakEveryMinutes * 60 * 1000);
    return () => clearTimeout(breakTimer);
  }, [breakEveryMinutes]);


  const current = steps[step];
  const contentParts =
    chunkSize === "small"
      ? current.content.split(/\n\n+/).filter((p) => p.trim().length > 0)
      : [current.content];
  const hasMoreContent = chunkSize === "small" && contentChunk < contentParts.length - 1;
  const visibleContent = contentParts[contentChunk] ?? current.content;
  const visibleFacts =
    chunkSize === "small" && current.keyFacts?.length
      ? current.keyFacts.slice(0, factIndex + 1)
      : current.keyFacts;
  const hasKeyFacts = Boolean(current.keyFacts?.length);
  const hasMoreFacts =
    chunkSize === "small" &&
    Boolean(current.keyFacts?.length) &&
    factIndex < (current.keyFacts?.length ?? 0) - 1;
  const hasInstructions = Boolean(current.instructions?.length);
  const allFactsChecked =
    !hasKeyFacts ||
    (chunkSize === "small"
      ? factIndex >= (current.keyFacts?.length ?? 0) - 1 &&
        Boolean(factsChecked[factIndex])
      : current.keyFacts!.every((_, i) => factsChecked[i]));
  const allInstructionsChecked =
    !hasInstructions ||
    current.instructions!.every((_, i) => instructionsChecked[i]);
  const needsCheck = Boolean(current.check) && !checkPassed;
  const needsAcknowledge =
    !current.check && !hasKeyFacts && !hasInstructions && !stepReady;
  const needsFacts = hasKeyFacts && !allFactsChecked;
  const needsInstructions = hasInstructions && !allInstructionsChecked;
  const canContinue =
    !needsCheck && !needsAcknowledge && !needsFacts && !needsInstructions;
  const canPressNext = hasMoreContent || hasMoreFacts || canContinue;

  const noCelebration = celebrationIntensity === "none";

  async function finish() {
    setLoading(true);
    const result = await completeLesson({ subjectSlug, lessonSlug, durationMinutes });
    setLoading(false);
    if (result.success) {
      setXp(result.data.xp);
      setDone(true);
    }
  }

  function resetStepInteraction() {
    setCheckAnswer(null);
    setCheckPassed(false);
    setTipRevealed(false);
    setFactsChecked({});
    setInstructionsChecked({});
    setStepReady(false);
    setContentChunk(0);
    setFactIndex(0);
  }

  function goNext() {
    if (hasMoreContent) {
      setContentChunk((c) => c + 1);
      return;
    }
    if (hasMoreFacts) {
      setFactIndex((f) => f + 1);
      return;
    }
    if (!canContinue) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      resetStepInteraction();
    } else {
      void finish();
    }
  }

  function submitCheck(option: string) {
    if (!current.check || checkPassed) return;
    setCheckAnswer(option);
    if (option === current.check.correctAnswer) {
      setCheckPassed(true);
    }
  }

  useEffect(() => {
    if (!checkPassed || !current.check) return;
    const timer = setTimeout(() => {
      if (canContinue) goNext();
    }, 1200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkPassed, step]);

  function toggleFact(index: number) {
    setFactsChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  function toggleInstruction(index: number) {
    setInstructionsChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  const progressPercent = Math.round(((step + 1) / steps.length) * 100);

  // ── CELEBRATION MODAL / SCREEN ──────────────────────────────────────────
  if (done) {
    const isCalm = calm || noCelebration || celebrationIntensity === "low";
    return (
      <div className={[styles.playerWrapper, isCalm ? "calmModeContainer" : ""].filter(Boolean).join(" ")}>
        <div className={isCalm ? styles.celebrationCardCalm : styles.celebrationCard}>
          <div className={isCalm ? styles.celebrationFoxCalm : styles.celebrationFox} aria-hidden="true">
            🦊
          </div>
          <h2 className={styles.celebrationHeading}>
            {isCalm
              ? "Lesson Finished"
              : alreadyCompleted
                ? "Lesson Completed Again!"
                : "Lesson Complete!"}
          </h2>
          <div className={isCalm ? styles.xpBadgeCalm : styles.xpBadge}>+{xp} XP EARNED</div>
          <p style={{ color: "#64748b", maxWidth: "420px", margin: "0 auto", lineHeight: 1.6 }}>
            {isCalm
              ? "Well done! Take a quiet breath before choosing what to explore next."
              : alreadyCompleted
                ? "Great revision! You're strengthening your knowledge every single day."
                : "Fantastic work! You practised real skills and earned bonus streak progress."}
          </p>

          <div className={styles.celebrationActions}>
            <Link
              href={`/learn/quiz/${subjectSlug}`}
              className={[styles.bigActionButton, styles.btnSuccess].join(" ")}
              style={{ width: "100%" }}
            >
              Take Quiz 🎯
            </Link>
            <Link
              href={`/learn/subjects/${subjectSlug}`}
              className={[styles.bigActionButton, styles.btnPrimary].join(" ")}
              style={{ width: "100%" }}
            >
              Back to Trail 🗺️
            </Link>
            <Link
              href="/learn"
              className={styles.bigActionButton}
              style={{ width: "100%", background: "#f1f5f9", color: "#475569" }}
            >
              Home Space 🏠
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={[styles.playerWrapper, calm ? "calmModeContainer" : ""].filter(Boolean).join(" ")}>
      {/* ── DUOLINGO-STYLE TOP BAR ─────────────────────────────────────── */}
      <div className={styles.topBar}>
        <Link
          href={`/learn/subjects/${subjectSlug}`}
          className={styles.exitBtn}
          title="Exit lesson"
          aria-label="Exit lesson"
        >
          ✕
        </Link>
        <div className={styles.progressTrack} role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles.progressBar} style={{ width: `${progressPercent}%` }} />
        </div>
        <div className={styles.statsCluster}>
          <span className={styles.streakPill} title="Study streak">
            🔥 <span>{showTimer ? `~${durationMinutes}m` : "Active"}</span>
          </span>
          <span className={styles.heartsPill} title="Wisely Energy">
            ❤️ <span>5</span>
          </span>
        </div>
      </div>

      {/* ── ADHD / FOCUS MOVEMENT BREAK ALERT ──────────────────────────── */}
      {showBreakAlert && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FEF3C7",
            border: "1.5px solid #F59E0B",
            borderRadius: "12px",
            padding: "0.75rem 1rem",
            marginBottom: "1rem",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>🧘</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#92400E" }}>
              Time for a quick stretch break! Stand up, stretch, or take a sip of water.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowBreakAlert(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#92400E",
              fontWeight: 800,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── VISUAL SCHEDULE (ADHD & AUTISM PREDICTABILITY) ─────────────── */}
      {showVisualSchedule && steps.length > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            marginBottom: "1rem",
            padding: "0.5rem 0.75rem",
            background: calm ? "#f4f6f5" : "#f8fafc",
            borderRadius: "12px",
            border: "1.5px solid #e2e8f0",
            overflowX: "auto",
          }}
          aria-label="Visual lesson schedule"
        >
          <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Plan:
          </span>
          {steps.map((s, idx) => {
            const isPast = idx < step;
            const isCurrent = idx === step;
            return (
              <span
                key={idx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.2rem",
                  fontSize: "0.75rem",
                  fontWeight: isCurrent ? 800 : 600,
                  color: isPast ? "#10b981" : isCurrent ? "var(--color-primary, #e05638)" : "#94a3b8",
                  background: isCurrent ? (calm ? "#eef4f0" : "#fff7ed") : "transparent",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                {isPast ? "✓" : `${idx + 1}.`} {s.title.length > 16 ? s.title.slice(0, 16) + "…" : s.title}
              </span>
            );
          })}
        </div>
      )}

      {/* ── MIMO-STYLE LESSON CARD ─────────────────────────────────────── */}
      <div className={styles.lessonCard}>
        <div className={styles.stepTagRow}>
          {current.method && (
            <Badge variant="success">{LEARNING_METHOD_LABELS[current.method]}</Badge>
          )}
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>
            Step {step + 1} of {steps.length}
          </span>
        </div>

        <h2 className={styles.stepTitle}>{current.title}</h2>

        {current.method && (
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
            {LEARNING_METHOD_HINTS[current.method]}
          </p>
        )}

        <p className={styles.lessonBody}>{visibleContent}</p>

        {chunkSize === "small" && contentParts.length > 1 && (
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            Part {contentChunk + 1} of {contentParts.length}
          </span>
        )}

        {/* Video Embed */}
        {current.videoId && (
          <LessonVideoEmbed
            videoId={current.videoId}
            title={current.videoTitle ?? `${title}, ${current.title}`}
          />
        )}

        {/* Key Facts Checklist */}
        {visibleFacts && visibleFacts.length > 0 && (
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "0.95rem", color: "#1e293b", display: "block", marginBottom: "0.5rem" }}>
              {chunkSize === "small" ? "Understand this fact, then continue:" : "Tap each key fact to check off:"}
            </strong>
            <div className={styles.checkList}>
              {visibleFacts.map((fact, i) => {
                const factKey = chunkSize === "small" ? factIndex : i;
                const isChecked = Boolean(factsChecked[factKey]);
                return (
                  <div
                    key={fact}
                    className={[
                      styles.interactiveCheckItem,
                      isChecked ? styles.interactiveCheckItemActive : "",
                    ].join(" ")}
                    onClick={() => toggleFact(factKey)}
                  >
                    <div className={styles.checkBoxMark}>{isChecked ? "✓" : ""}</div>
                    <span style={{ fontSize: "0.95rem", lineHeight: 1.4 }}>{fact}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Practice Instructions */}
        {current.instructions && current.instructions.length > 0 && (
          <div style={{ marginTop: "0.5rem" }}>
            <strong style={{ fontSize: "0.95rem", color: "#1e293b", display: "block", marginBottom: "0.5rem" }}>
              Follow these practice steps:
            </strong>
            <div className={styles.checkList}>
              {current.instructions.map((instruction, i) => {
                const isChecked = Boolean(instructionsChecked[i]);
                return (
                  <div
                    key={instruction}
                    className={[
                      styles.interactiveCheckItem,
                      isChecked ? styles.interactiveCheckItemActive : "",
                    ].join(" ")}
                    onClick={() => toggleInstruction(i)}
                  >
                    <div className={styles.checkBoxMark}>{isChecked ? "✓" : ""}</div>
                    <span style={{ fontSize: "0.95rem", lineHeight: 1.4 }}>
                      <strong>Step {i + 1}.</strong> {instruction}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Codecademy Practical Tip */}
        {current.tip && (
          <div style={{ marginTop: "0.5rem" }}>
            {tipRevealed ? (
              <div className={styles.tipBox}>
                <strong>💡 Wisely&apos;s Pro Tip</strong>
                {current.tip}
              </div>
            ) : (
              <button
                type="button"
                className={[styles.tactileChoiceBtn, styles.tactileChoiceSelected].join(" ")}
                style={{ padding: "0.6rem 1rem", fontSize: "0.85rem", width: "auto" }}
                onClick={() => setTipRevealed(true)}
              >
                💡 Show Hint & Pro Tip
              </button>
            )}
          </div>
        )}

        {/* ── DUOLINGO-STYLE INTERACTIVE QUESTION CHECK ─────────────────── */}
        {current.check && (
          <div style={{ marginTop: "1rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontFamily: "var(--font-sans)", fontWeight: 800, color: "#1e293b", marginBottom: "0.75rem" }}>
              {current.check.prompt}
            </h3>

            <div className={styles.optionsGrid}>
              {current.check.options.map((opt) => {
                const isSelected = checkAnswer === opt;
                const isCorrect = opt === current.check!.correctAnswer;
                const isPassed = checkPassed && isCorrect;
                const isFailed = checkAnswer && !checkPassed && isSelected;

                return (
                  <button
                    key={opt}
                    type="button"
                    className={[
                      styles.tactileChoiceBtn,
                      isSelected ? styles.tactileChoiceSelected : "",
                      isPassed ? styles.tactileChoiceCorrect : "",
                      isFailed ? styles.tactileChoiceIncorrect : "",
                    ].join(" ")}
                    disabled={checkPassed}
                    onClick={() => submitCheck(opt)}
                  >
                    <span>{opt}</span>
                    {isPassed && <span aria-hidden="true">✓</span>}
                    {isFailed && <span aria-hidden="true">✗</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Acknowledge Button for pure reading steps */}
        {!current.check && !hasKeyFacts && (
          <div style={{ marginTop: "0.5rem" }}>
            <button
              type="button"
              className={[
                styles.tactileChoiceBtn,
                stepReady ? styles.tactileChoiceCorrect : styles.tactileChoiceSelected,
              ].join(" ")}
              onClick={() => setStepReady(true)}
            >
              <span>{stepReady ? "✓ I've got it, ready to proceed!" : "📖 Tap here once you've read this"}</span>
            </button>
          </div>
        )}
      </div>

      {/* ── DUOLINGO-STYLE STICKY BOTTOM ACTION SHEET ─────────────────── */}
      <div
        className={[
          styles.actionTray,
          checkPassed
            ? styles.actionTrayCorrect
            : checkAnswer && !checkPassed
              ? styles.actionTrayIncorrect
              : "",
        ].join(" ")}
      >
        <div className={styles.actionTrayInner}>
          {checkPassed ? (
            <div className={styles.feedbackMessage}>
              <span className={styles.feedbackIcon} aria-hidden="true">
                🎉
              </span>
              <div className={styles.feedbackText}>
                <h4 className={styles.feedbackTitle}>Great job! +10 XP</h4>
                <p className={styles.feedbackSub}>{current.check?.explanation || "Spot on!"}</p>
              </div>
            </div>
          ) : checkAnswer && !checkPassed ? (
            <div className={styles.feedbackMessage}>
              <span className={styles.feedbackIcon} aria-hidden="true">
                🦊
              </span>
              <div className={styles.feedbackText}>
                <h4 className={[styles.feedbackTitle, styles.feedbackTitleIncorrect].join(" ")}>
                  Not quite yet!
                </h4>
                <p className={[styles.feedbackSub, styles.feedbackSubIncorrect].join(" ")}>
                  {current.check?.explanation || "Review the text above and try another option."}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: "0.875rem", color: "#64748b", fontWeight: 600 }}>
              {hasMoreContent
                ? "Read through to continue"
                : needsFacts
                  ? "Check all facts above"
                  : needsInstructions
                    ? "Complete steps above"
                    : needsCheck
                      ? "Select the correct answer"
                      : "Ready for the next step!"}
            </div>
          )}

          <button
            type="button"
            className={[
              styles.bigActionButton,
              canPressNext
                ? checkPassed
                  ? styles.btnSuccess
                  : styles.btnPrimary
                : styles.btnDisabled,
            ].join(" ")}
            disabled={!canPressNext || loading}
            onClick={goNext}
          >
            {loading
              ? "Saving..."
              : checkPassed
                ? "Continue →"
                : hasMoreContent
                  ? "Next part"
                  : hasMoreFacts
                    ? "Next fact"
                    : step < steps.length - 1
                      ? "Continue"
                      : "Finish Lesson"}
          </button>
        </div>
      </div>
    </div>
  );
}
