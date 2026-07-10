"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, Card, Alert, ProgressBar, Badge } from "@/shared/ui";
import { completeQuiz } from "@/features/learning/actions/learning.actions";
import type { AccommodationRules } from "@/features/inclusive/services/accommodation.service";
import styles from "./learnActivity.module.css";

type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string | null;
};

type AnswerRecord = {
  prompt: string;
  chosen: string;
  correct: string;
  correctAnswer: boolean;
  explanation: string | null;
};

const AUTO_ADVANCE_MS = 1400;

export function QuizPlayer({
  subjectSlug,
  subjectTitle,
  questions,
  calm = false,
  chunkSize = "medium",
  showTimer = true,
  celebrationIntensity = "medium",
  hintDelaySeconds = 15,
}: {
  subjectSlug: string;
  subjectTitle: string;
  questions: QuizQuestion[];
  calm?: boolean;
  chunkSize?: AccommodationRules["chunkSize"];
  showTimer?: boolean;
  celebrationIntensity?: AccommodationRules["celebrationIntensity"];
  hintDelaySeconds?: number;
}) {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<{
    xp: number;
    score: number;
    passed: boolean;
    certificateCode: string | null;
    attemptId: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<AnswerRecord[]>([]);
  const [history, setHistory] = useState<AnswerRecord[]>([]);

  const q = questions[index];
  const isCorrect = selected === q?.correctAnswer;
  const noCelebration = celebrationIntensity === "none";
  const advanceMs =
    chunkSize === "small" || noCelebration ? Math.max(hintDelaySeconds * 1000, 2500) : AUTO_ADVANCE_MS;

  async function submitFinal(records: AnswerRecord[]) {
    setLoading(true);
    const finalCorrect = records.filter((r) => r.correctAnswer).length;
    const res = await completeQuiz({
      subjectSlug,
      correct: finalCorrect,
      total: questions.length,
    });
    setLoading(false);
    if (res.success) {
      setResult(res.data);
      setHistory(records);
      historyRef.current = records;
      setFinished(true);
    }
  }

  function goNext() {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
      return;
    }
    void submitFinal(historyRef.current);
  }

  useEffect(() => {
    if (!showFeedback || !isCorrect || finished || loading) return;
    const timer = setTimeout(goNext, advanceMs);
    return () => clearTimeout(timer);
  }, [showFeedback, isCorrect, finished, loading, index, advanceMs]);

  function answer(option: string) {
    if (showFeedback || finished || loading) return;
    const correct = option === q.correctAnswer;
    setSelected(option);
    setShowFeedback(true);
    if (correct) setCorrectCount((c) => c + 1);

    const record: AnswerRecord = {
      prompt: q.prompt,
      chosen: option,
      correct: q.correctAnswer,
      correctAnswer: correct,
      explanation: q.explanation,
    };
    historyRef.current = [...historyRef.current, record];
  }

  if (finished && result) {
    const wrong = history.filter((h) => !h.correctAnswer);
    const masteryLabel =
      result.score >= 90
        ? "Mastery rising"
        : result.score >= 70
          ? "Solid progress"
          : "Keep practising";

    return (
      <Card>
        <Alert variant="success" title={noCelebration ? `${subjectTitle} quiz finished` : `${subjectTitle} quiz complete`}>
          Score: {result.score}%, +{result.xp} XP, {masteryLabel}
        </Alert>
        <p className={styles.learnMeta}>
          Your WiselyFox learning path is updated, parents see progress on their dashboard.
        </p>

        {wrong.length > 0 && (
          <div className={styles.reviewBlock}>
            <h3>Review these topics</h3>
            {wrong.map((item) => (
              <div key={item.prompt} className={styles.reviewItem}>
                <p>
                  <strong>{item.prompt}</strong>
                </p>
                <p className={styles.learnMeta}>
                  Your answer: {item.chosen}, Correct: {item.correct}
                </p>
                {item.explanation && <Alert variant="info">{item.explanation}</Alert>}
              </div>
            ))}
          </div>
        )}

        <div className={styles.btnGroup}>
          {result.passed && result.certificateCode && (
            <Link href={`/learn/certificates/${result.attemptId}`}>
              <Button size="sm">View your certificate</Button>
            </Link>
          )}
          <Link href={`/learn/guide/${subjectSlug}`}>
            <Button variant="secondary" size="sm">
              Re-read study guide
            </Button>
          </Link>
          <Link href={`/learn/quiz/${subjectSlug}`}>
            <Button variant="secondary" size="sm">
              Try again
            </Button>
          </Link>
          <Link href={`/learn/subjects/${subjectSlug}`}>
            <Button size="sm">Back to lessons</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <ProgressBar value={((index + 1) / questions.length) * 100} label="Quiz progress" calm={calm} />
      <p className={styles.learnMeta}>
        {showTimer ? `Question ${index + 1} of ${questions.length}` : "One question at a time"}
        {showTimer ? `, ${correctCount} correct` : ""}
        {chunkSize === "small" ? ", Read carefully before answering" : ""}
        {isCorrect && showFeedback && showTimer ? ", Nice! Next question coming…" : ""}
      </p>
      <h2>{q.prompt}</h2>
      {showFeedback && q.explanation && (
        <Alert variant={isCorrect ? "success" : "warning"}>
          {isCorrect ? "Correct! " : "Not quite. "}
          {q.explanation}
        </Alert>
      )}
      <div className={styles.optionGrid}>
        {q.options.map((opt) => (
          <Button
            key={opt}
            variant={
              showFeedback && opt === q.correctAnswer
                ? "primary"
                : "secondary"
            }
            size="sm"
            disabled={showFeedback || loading}
            onClick={() => answer(opt)}
          >
            {opt}
          </Button>
        ))}
      </div>
      {showFeedback && !isCorrect && (
        <div className={styles.btnGroup}>
          <Button size="sm" loading={loading} onClick={goNext}>
            {index < questions.length - 1 ? "Next question" : "See results"}
          </Button>
        </div>
      )}
    </Card>
  );
}
