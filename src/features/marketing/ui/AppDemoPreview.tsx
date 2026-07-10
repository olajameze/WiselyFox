"use client";

import { useMemo } from "react";
import { Tabs } from "@/shared/ui/Tabs/Tabs";
import styles from "../styles/marketing.module.css";

export function AppDemoPreview() {
  const scenarios = useMemo(
    () => [
      {
        id: "study",
        label: "Study session",
        content: (
          <div className={styles.featureCard}>
            <p>
              Maya completes a 12 minute maths lesson with small steps, instant feedback, and a
              gentle celebration.
            </p>
            <ul>
              <li>Chunked instructions</li>
              <li>Optional hints when stuck</li>
              <li>+15 XP earned</li>
            </ul>
          </div>
        ),
      },
      {
        id: "parent",
        label: "Parent progress",
        content: (
          <div className={styles.featureCard}>
            <p>
              Dad sees reading up 12%, maths steady, and a 5 day streak, all in one calm
              dashboard.
            </p>
          </div>
        ),
      },
      {
        id: "calm",
        label: "Calm focus mode",
        content: (
          <div className={styles.featureCard}>
            <p>
              No countdown pressure. Soft colours. Movement break prompt every 10 minutes.
              Perfect for anxious learners.
            </p>
          </div>
        ),
      },
      {
        id: "quests",
        label: "Daily quests",
        content: (
          <div className={styles.featureCard}>
            <p>
              Three achievable missions today: 1 reading quiz, 10 minute focus session, review
              yesterday&apos;s maths.
            </p>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <section aria-label="Interactive app preview">
      <Tabs items={scenarios} />
    </section>
  );
}
