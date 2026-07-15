"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Alert } from "@/shared/ui";
import styles from "./learnActivity.module.css";

type StepCheck = {
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type GuidePractice = {
  title: string;
  instructions: string[];
  reflection: string;
};

type Section = {
  title: string;
  content: string;
  tips: string[];
  keyPoints?: string[];
  check?: StepCheck;
  videoId?: string;
  videoTitle?: string;
  practice?: GuidePractice;
};

function SectionToggle({
  title,
  isOpen,
  panelId,
  onOpen,
  onClose,
}: {
  title: string;
  isOpen: boolean;
  panelId: string;
  onOpen: () => void;
  onClose: () => void;
}) {
  if (isOpen) {
    return (
      <button
        type="button"
        className={styles.guideToggle}
        aria-expanded="true"
        aria-controls={panelId}
        onClick={onClose}
      >
        <span>{title}</span>
        <span aria-hidden="true">−</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.guideToggle}
      aria-expanded="false"
      aria-controls={panelId}
      onClick={onOpen}
    >
      <span>{title}</span>
      <span aria-hidden="true">+</span>
    </button>
  );
}

function PracticePanel({
  practice,
  sectionIndex,
}: {
  practice: GuidePractice;
  sectionIndex: number;
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [reflected, setReflected] = useState(false);

  const allDone = practice.instructions.every((_, i) => checked[i]);

  return (
    <div className={styles.practiceBlock}>
      <strong>Hands on practice: {practice.title}</strong>
      <p className={styles.learnMeta}>Follow each step, then tick when done.</p>
      <ul className={styles.factChecklist}>
        {practice.instructions.map((step, i) => (
          <li key={step}>
            <label className={styles.factLabel}>
              <input
                type="checkbox"
                checked={Boolean(checked[i])}
                onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))}
              />
              <span>
                <strong>Step {i + 1}.</strong> {step}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {allDone && !reflected && (
        <div className={styles.ackBlock}>
          <Alert variant="info" title="Reflection">
            {practice.reflection}
          </Alert>
          <Button size="sm" variant="secondary" onClick={() => setReflected(true)}>
            I completed this practice
          </Button>
        </div>
      )}
      {reflected && (
        <Alert variant="success">Practice complete, great work for section {sectionIndex + 1}!</Alert>
      )}
    </div>
  );
}

export function StudyGuideViewer({
  subjectSlug,
  subjectTitle,
  intro,
  sections,
}: {
  subjectSlug: string;
  subjectTitle: string;
  intro: string;
  sections: Section[];
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [passed, setPassed] = useState<Record<number, boolean>>({});

  function answer(sectionIndex: number, option: string, section: Section) {
    if (!section.check || passed[sectionIndex]) return;
    setAnswers((prev) => ({ ...prev, [sectionIndex]: option }));
    if (option === section.check.correctAnswer) {
      setPassed((prev) => ({ ...prev, [sectionIndex]: true }));
    }
  }

  const completedChecks = sections.filter((s, i) => s.check && passed[i]).length;
  const totalChecks = sections.filter((s) => s.check).length;
  const practiceCount = sections.filter((s) => s.practice).length;

  return (
    <>
      <Alert variant="info">{intro}</Alert>

      <Alert variant="info" title="Videos are on a separate page">
        Watch curated {subjectTitle} clips on the Videos page. This guide stays focused on reading, practice, and
        checks.
      </Alert>

      <p className={styles.learnMeta}>
        Quick checks: {completedChecks}/{totalChecks}, Hands on sections: {practiceCount}
      </p>

      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        const sectionPassed = passed[index];
        const selected = answers[index];
        const panelId = `guide-section-panel-${index}`;

        return (
          <Card key={section.title} className={styles.guideSection}>
            <SectionToggle
              title={section.title}
              isOpen={isOpen}
              panelId={panelId}
              onOpen={() => setOpenIndex(index)}
              onClose={() => setOpenIndex(-1)}
            />

            {isOpen && (
              <div id={panelId} className={styles.guideBody}>
                <p>{section.content}</p>

                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className={styles.keyFacts}>
                    <strong>Remember</strong>
                    <ul>
                      {section.keyPoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className={styles.tipList}>
                  {section.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>

                {section.practice && (
                  <PracticePanel practice={section.practice} sectionIndex={index} />
                )}

                {section.check && (
                  <div className={styles.checkBlock}>
                    <strong>Quick check</strong>
                    <p>{section.check.prompt}</p>
                    <div className={styles.optionGrid}>
                      {section.check.options.map((opt) => (
                        <Button
                          key={opt}
                          variant={
                            selected === opt && opt === section.check!.correctAnswer
                              ? "primary"
                              : "secondary"
                          }
                          size="sm"
                          disabled={sectionPassed}
                          onClick={() => answer(index, opt, section)}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                    {selected && selected !== section.check.correctAnswer && (
                      <Alert variant="warning">{section.check.explanation} Try again!</Alert>
                    )}
                    {sectionPassed && (
                      <Alert variant="success">{section.check.explanation}</Alert>
                    )}
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}

      <div className={styles.btnGroup}>
        <Link href={`/learn/videos/${subjectSlug}`}>
          <Button variant="secondary" size="sm">
            {subjectTitle} videos
          </Button>
        </Link>
        <Link href={`/learn/subjects/${subjectSlug}`}>
          <Button size="sm">Start {subjectTitle} lessons</Button>
        </Link>
        <Link href={`/learn/quiz/${subjectSlug}`}>
          <Button variant="ghost" size="sm">
            Take {subjectTitle} quiz
          </Button>
        </Link>
      </div>
    </>
  );
}
