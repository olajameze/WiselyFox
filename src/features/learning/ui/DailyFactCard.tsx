"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button, Badge } from "@/shared/ui";
import type { DailyFact } from "@/data/daily-facts";
import styles from "./learnActivity.module.css";

type Props = {
  childId: string;
  fact: DailyFact;
};

function dismissKey(childId: string, date: Date) {
  const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return `wfox-fact-dismissed-${childId}-${day}`;
}

export function DailyFactCard({ childId, fact }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(dismissKey(childId, new Date()));
      if (stored === "1") setDismissed(true);
    } catch {
      // localStorage unavailable
    }
  }, [childId]);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(dismissKey(childId, new Date()), "1");
    } catch {
      // ignore
    }
  }

  if (dismissed) return null;

  return (
    <Card className={styles.dailyFactCard}>
      <div className={styles.dailyFactHeader}>
        <h2>Today&apos;s fact</h2>
        <Button variant="ghost" size="sm" onClick={dismiss} aria-label="Dismiss today's fact">
          Dismiss
        </Button>
      </div>

      <div className={styles.dailyFact}>
        <p>{fact.text}</p>
        <p className={styles.learnMeta}>
          <Badge>{fact.subjectLabel}</Badge>, {fact.skill}
        </p>
      </div>

      {expanded && (
        <div className={styles.dailyFactDetail}>
          <p>{fact.detail}</p>
          {fact.example && (
            <p className={styles.learnMeta}>
              <strong>Example:</strong> {fact.example}
            </p>
          )}
        </div>
      )}

      <div className={styles.btnGroup}>
        <Button size="sm" variant="secondary" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "Show less" : "View more"}
        </Button>
        <Link href={fact.learnHref}>
          <Button size="sm">{fact.learnLabel}</Button>
        </Link>
      </div>
    </Card>
  );
}
