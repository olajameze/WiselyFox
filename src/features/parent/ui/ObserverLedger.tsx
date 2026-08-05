"use client";

import { useState } from "react";
import styles from "./ObserverLedger.module.css";

type Milestone = {
  id: string;
  label: string;
  value: string;
  trend: "up" | "flat" | "down";
};

type TutorInteraction = {
  id: string;
  tutorName: string;
  summary: string;
  at: string;
};

type ObserverLedgerProps = {
  childName: string;
  ageBand: string;
  studyMinutes: number;
  xp: number;
  streak: number;
  milestones: Milestone[];
  tutorInteractions: TutorInteraction[];
};

export function ObserverLedger({
  childName,
  ageBand,
  studyMinutes,
  xp,
  streak,
  milestones,
  tutorInteractions,
}: ObserverLedgerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.ledger}>
      <button
        type="button"
        className={styles.ledgerHeader}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`observer-ledger-${childName}`}
      >
        <span className={styles.ledgerTitle}>Observer Ledger</span>
        <span className={styles.ledgerMeta}>
          {childName} · {ageBand}
        </span>
        <span className={styles.ledgerChevron} aria-hidden="true">
          {open ? "▾" : "▸"}
        </span>
      </button>

      {open && (
        <div id={`observer-ledger-${childName}`} className={styles.ledgerBody}>
          <div className={styles.ledgerStats}>
            <div className={styles.ledgerStat}>
              <span className={styles.ledgerStatValue}>{studyMinutes}</span>
              <span className={styles.ledgerStatLabel}>Study min</span>
            </div>
            <div className={styles.ledgerStat}>
              <span className={styles.ledgerStatValue}>{xp}</span>
              <span className={styles.ledgerStatLabel}>XP</span>
            </div>
            <div className={styles.ledgerStat}>
              <span className={styles.ledgerStatValue}>{streak}</span>
              <span className={styles.ledgerStatLabel}>Day streak</span>
            </div>
          </div>

          <h3 className={styles.ledgerSectionTitle}>Milestone shifts</h3>
          <ul className={styles.ledgerList}>
            {milestones.map((m) => (
              <li key={m.id} className={styles.ledgerRow}>
                <span className={styles.ledgerRowLabel}>{m.label}</span>
                <span className={styles.ledgerRowValue}>{m.value}</span>
                <span
                  className={`${styles.ledgerRowTrend} ${styles[`trend${m.trend}`]}`}
                  aria-label={`Trend ${m.trend}`}
                >
                  {m.trend === "up" ? "▲" : m.trend === "down" ? "▼" : "—"}
                </span>
              </li>
            ))}
          </ul>

          <h3 className={styles.ledgerSectionTitle}>Tutor interactions</h3>
          {tutorInteractions.length === 0 ? (
            <p className={styles.ledgerEmpty}>No tutor interactions on record.</p>
          ) : (
            <ul className={styles.ledgerList}>
              {tutorInteractions.map((t) => (
                <li key={t.id} className={styles.ledgerRow}>
                  <span className={styles.ledgerRowLabel}>{t.tutorName}</span>
                  <span className={styles.ledgerRowNote}>{t.summary}</span>
                  <span className={styles.ledgerRowDate}>{t.at}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
