"use client";

import styles from "./LoginStepOne.module.css";

export type LoginRole = "learner" | "student" | "parent" | "tutor";

const ROLE_OPTIONS: { value: LoginRole; label: string; hint: string }[] = [
  { value: "learner", label: "Learner account", hint: "Email and password · 18+" },
  { value: "student", label: "Family access code", hint: "I sign in with a code and PIN" },
  { value: "parent", label: "Parent or guardian", hint: "I manage a learner's account" },
  { value: "tutor", label: "Tutor", hint: "I teach on WiselyFox" },
];

export function LoginStepOne({
  onSelect,
}: {
  onSelect: (role: LoginRole) => void;
}) {
  return (
    <div className={styles.stepOne}>
      <div className={styles.wordmark} aria-hidden="true">
        W
      </div>
      <h1 className={styles.title}>Welcome to WiselyFox</h1>
      <p className={styles.subtitle}>Choose how you usually sign in.</p>
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
