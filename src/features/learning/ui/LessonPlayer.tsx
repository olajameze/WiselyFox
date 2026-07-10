"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, ProgressBar, Alert, Badge } from "@/shared/ui";
import { completeLesson } from "@/features/learning/actions/learning.actions";
import { LEARNING_METHOD_LABELS, LEARNING_METHOD_HINTS } from "@/data/learning-methods";
import type { LessonStep } from "@/data/curriculum";
import { LessonVideoEmbed } from "@/features/learning/ui/LessonVideoEmbed";
import type { AccommodationRules } from "@/features/inclusive/services/accommodation.service";
import styles from "./learnActivity.module.css";

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
  const needsContentChunk = hasMoreContent;
  const needsMoreFacts = hasMoreFacts;
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

  function goToStep(index: number) {
    if (index > step) return;
    setStep(index);
    resetStepInteraction();
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
    }, 1000);
    return () => clearTimeout(timer);
  }, [checkPassed, step]);

  function toggleFact(index: number) {
    setFactsChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  function toggleInstruction(index: number) {
    setInstructionsChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  if (done) {
    return (
      <Card>
        <Alert variant="success" title={noCelebration ? "Lesson finished" : alreadyCompleted ? "Lesson completed again!" : "Lesson complete!"}>
          +{xp} XP earned.
          {noCelebration
            ? " Well done, take a breath before your next step."
            : alreadyCompleted
              ? " Great revision, try the quiz to see what you remember!"
              : " You practised real skills, try the quiz to see what you remember!"}
        </Alert>
        <div className={styles.btnGroup}>
          <Link href={`/learn/quiz/${subjectSlug}`}>
            <Button variant="secondary" size="sm">
              Take quiz
            </Button>
          </Link>
          <Link href={`/learn/subjects/${subjectSlug}`}>
            <Button variant="secondary" size="sm">
              More lessons
            </Button>
          </Link>
          <Link href="/learn">
            <Button size="sm">Back home</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <>
      <p className={styles.learnMeta}>
        {title}, Step {step + 1} of {steps.length}
        {showTimer ? `, ~${durationMinutes} min` : ""}
        {chunkSize === "small" ? ", One idea at a time" : ""}
      </p>
      <ProgressBar value={((step + 1) / steps.length) * 100} label="Lesson progress" calm={calm} />

      <nav className={styles.stepNav} aria-label="Lesson steps">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            className={[
              styles.stepPill,
              i === step ? styles.stepPillActive : "",
              i < step ? styles.stepPillDone : "",
            ]
              .filter(Boolean)
              .join(" ")}
            disabled={i > step}
            aria-current={i === step ? "step" : undefined}
            onClick={() => goToStep(i)}
          >
            {s.title}
          </button>
        ))}
      </nav>

      <Card className={styles.lessonCard}>
        {current.method && (
          <Badge variant="success">{LEARNING_METHOD_LABELS[current.method]}</Badge>
        )}
        <Badge>{current.title}</Badge>
        <h2 className={styles.lessonHeading}>{current.title}</h2>
        {current.method && (
          <p className={styles.learnMeta}>{LEARNING_METHOD_HINTS[current.method]}</p>
        )}
        <p className={styles.lessonBody}>{visibleContent}</p>
        {chunkSize === "small" && contentParts.length > 1 && (
          <p className={styles.learnMeta}>
            Part {contentChunk + 1} of {contentParts.length}
          </p>
        )}

        {current.videoId && (
          <LessonVideoEmbed
            videoId={current.videoId}
            title={current.videoTitle ?? `${title}, ${current.title}`}
          />
        )}

        {visibleFacts && visibleFacts.length > 0 && (
          <div className={styles.keyFacts}>
            <strong>
              {chunkSize === "small"
                ? "Understand this fact, then continue"
                : "Tap each fact when you understand it"}
            </strong>
            <ul className={styles.factChecklist}>
              {visibleFacts.map((fact, i) => {
                const factKey = chunkSize === "small" ? factIndex : i;
                return (
                <li key={fact}>
                  <label className={styles.factLabel}>
                    <input
                      type="checkbox"
                      checked={Boolean(factsChecked[factKey])}
                      onChange={() => toggleFact(factKey)}
                    />
                    <span>{fact}</span>
                  </label>
                </li>
              );
              })}
            </ul>
          </div>
        )}

        {current.instructions && current.instructions.length > 0 && (
          <div className={styles.practiceBlock}>
            <strong>Follow these steps, tick each when done</strong>
            <ul className={styles.factChecklist}>
              {current.instructions.map((instruction, i) => (
                <li key={instruction}>
                  <label className={styles.factLabel}>
                    <input
                      type="checkbox"
                      checked={Boolean(instructionsChecked[i])}
                      onChange={() => toggleInstruction(i)}
                    />
                    <span>
                      <strong>Step {i + 1}.</strong> {instruction}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {current.tip && (
          <div className={styles.tipReveal}>
            {tipRevealed ? (
              <Alert variant="info" title="Tip">
                {current.tip}
              </Alert>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => setTipRevealed(true)}>
                Show hint
              </Button>
            )}
          </div>
        )}

        {current.check && (
          <div className={styles.checkBlock}>
            <strong>Check your understanding</strong>
            <p>{current.check.prompt}</p>
            <div className={styles.optionGrid}>
              {current.check.options.map((opt) => {
                const isSelected = checkAnswer === opt;
                const isCorrect = opt === current.check!.correctAnswer;
                let variant: "secondary" | "primary" = "secondary";
                if (isSelected && isCorrect) variant = "primary";
                return (
                  <Button
                    key={opt}
                    variant={variant}
                    size="sm"
                    disabled={checkPassed && !isCorrect}
                    onClick={() => submitCheck(opt)}
                  >
                    {opt}
                  </Button>
                );
              })}
            </div>
            {checkAnswer && checkAnswer !== current.check.correctAnswer && (
              <Alert variant="warning">{current.check.explanation} Try again!</Alert>
            )}
            {checkPassed && (
              <Alert variant="success">{current.check.explanation} Well done!</Alert>
            )}
          </div>
        )}

        {!current.check && !hasKeyFacts && (
          <div className={styles.ackBlock}>
            <Button
              variant={stepReady ? "primary" : "secondary"}
              size="sm"
              onClick={() => setStepReady(true)}
            >
              {stepReady ? "Ready, keep going!" : "I've read this, continue"}
            </Button>
          </div>
        )}

        <div className={styles.btnGroup}>
          {step > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStep(step - 1);
                resetStepInteraction();
              }}
            >
              Back
            </Button>
          )}
          <Button size="sm" loading={loading} disabled={!canPressNext} onClick={goNext}>
            {needsContentChunk
              ? "Read next part"
              : needsMoreFacts
                ? "Next fact"
              : needsCheck
              ? "Answer correctly to continue"
              : needsFacts
                ? "Check all key facts to continue"
                : needsInstructions
                  ? "Complete all practice steps to continue"
                  : needsAcknowledge
                  ? "Tap 'I've read this' above"
                  : step < steps.length - 1
                    ? "Next step"
                    : "Finish lesson"}
          </Button>
        </div>
      </Card>
    </>
  );
}
