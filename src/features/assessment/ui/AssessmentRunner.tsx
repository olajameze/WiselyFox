"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Alert } from "@/shared/ui";
import { ASSESSMENT_QUESTIONS } from "@/features/assessment/services/assessment.service";
import { submitAssessment } from "@/features/onboarding/actions/onboarding.actions";
import styles from "@/features/parent/ui/parent.module.css";

type Props = {
  childId: string;
  childName: string;
};

export function AssessmentRunner({ childId, childName }: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: string; correct: boolean; responseTimeMs: number; confidence: number }[]
  >([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [confidence, setConfidence] = useState(3);
  const [result, setResult] = useState<{ level: string; score: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const q = ASSESSMENT_QUESTIONS[index];

  async function answer(option: string) {
    const responseTimeMs = Date.now() - startTime;
    const newAnswers = [
      ...answers,
      { questionId: q.id, correct: option === q.correct, responseTimeMs, confidence },
    ];
    setAnswers(newAnswers);

    if (index < ASSESSMENT_QUESTIONS.length - 1) {
      setIndex(index + 1);
      setStartTime(Date.now());
      setConfidence(3);
    } else {
      setLoading(true);
      const res = await submitAssessment({ childId, answers: newAnswers });
      setLoading(false);
      if (res.success) setResult(res.data);
    }
  }

  if (result) {
    return (
      <div className={styles.narrowPage}>
        <Card>
          <h2>Assessment complete</h2>
          <p className={styles.meta}>
            {childName}&apos;s entrance level has been updated for adaptive learning.
          </p>
          <Alert variant="success" title={`Level: ${result.level}`}>
            Score: {result.score.toFixed(0)}%. We&apos;ll use this to personalise lessons and quiz picks.
          </Alert>
          <div className={styles.actionRow}>
            <Button fullWidth onClick={() => router.push(`/parent/assessment/${childId}`)}>
              View assessment results
            </Button>
            <Button variant="ghost" fullWidth onClick={() => router.push("/parent")}>
              Back to dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.narrowPage}>
      <Card>
        <p className={styles.questionMeta}>
          Question {index + 1} of {ASSESSMENT_QUESTIONS.length}
        </p>
        <p className={styles.meta}>
          Help {childName} answer if needed. This short check covers reading, maths, logic, memory, and
          attention.
        </p>
        <h2>{q.prompt}</h2>
        <div className={styles.answerList}>
          {q.options.map((opt) => (
            <Button key={opt} variant="secondary" fullWidth onClick={() => answer(opt)} disabled={loading}>
              {opt}
            </Button>
          ))}
        </div>
        <label className={styles.confidenceLabel}>
          How confident is your child? ({confidence})
          <input
            type="range"
            min={1}
            max={5}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className={styles.rangeInput}
            aria-label="Confidence level"
          />
        </label>
      </Card>
    </div>
  );
}
