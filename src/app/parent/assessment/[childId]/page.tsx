"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, Card, Alert } from "@/shared/ui";
import { ASSESSMENT_QUESTIONS } from "@/features/assessment/services/assessment.service";
import { submitAssessment } from "@/features/onboarding/actions/onboarding.actions";
import styles from "@/features/parent/ui/parent.module.css";

export default function AssessmentPage() {
  const params = useParams();
  const childId = params.childId as string;
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
      <div className={`container ${styles.narrowPage}`}>
        <Card>
          <h2>Assessment complete</h2>
          <Alert variant="success" title={`Level: ${result.level}`}>
            Score: {result.score.toFixed(0)}%, We&apos;ll use this to personalise learning.
          </Alert>
          <Button fullWidth onClick={() => router.push("/parent")}>
            Back to dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`container ${styles.narrowPage}`}>
      <Card>
        <p className={styles.questionMeta}>
          Question {index + 1} of {ASSESSMENT_QUESTIONS.length}
        </p>
        <h2>{q.prompt}</h2>
        <div className={styles.answerList}>
          {q.options.map((opt) => (
            <Button key={opt} variant="secondary" fullWidth onClick={() => answer(opt)} disabled={loading}>
              {opt}
            </Button>
          ))}
        </div>
        <label>
          How confident are you? ({confidence})
          <input
            type="range"
            min={1}
            max={5}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className={styles.rangeInput}
          />
        </label>
      </Card>
    </div>
  );
}
