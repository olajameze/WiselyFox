"use client";

import { FoxMascot } from "./FoxMascot";
import styles from "./LoginStepOne.module.css";

export type LoginRole = "student" | "parent" | "tutor";

const ROLE_OPTIONS: { value: LoginRole; label: string; hint: string }[] = [
  { value: "student", label: "Student", hint: "I'm here to learn" },
  { value: "parent", label: "Parent", hint: "I guide a learner" },
  { value: "tutor", label: "Tutor", hint: "I teach on WiselyFox" },
];

export function LoginStepOne({
  onSelect,
}: {
  onSelect: (role: LoginRole) => void;
}) {
  return (
    <div className={styles.stepOne}>
      <div className={styles.illustration} aria-hidden="true">
        <FoxMascot className={styles.fox} />
      </div>
      <h1 className={styles.title}>Welcome to WiselyFox</h1>
      <p className={styles.subtitle}>Login as a</p>
      <div className={styles.roleList}>
        {ROLE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.roleButton}
            onClick={() => onSelect(option.value)}
            aria-label={`Continue as ${option.label}`}
          >
            <span className={styles.roleLabel}>{option.label}</span>
            <span className={styles.roleHint}>{option.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
