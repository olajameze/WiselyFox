"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/shared/ui";
import {
  signInParent,
  signInChild,
} from "@/features/auth/actions/auth.actions";
import type { LoginRole } from "./LoginStepOne";
import styles from "./LoginStepTwo.module.css";

type LoginStepTwoProps = {
  role: LoginRole;
  callbackUrl?: string;
  onBack: () => void;
};

const ROLE_LABEL: Record<LoginRole, string> = {
  student: "Student",
  parent: "Parent",
  tutor: "Tutor",
};

const PIN_DIGITS = 4;

export function LoginStepTwo({ role, callbackUrl, onBack }: LoginStepTwoProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const isStudent = role === "student";

  function resolveDestination(destination: string) {
    return callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : destination;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isStudent) {
      const fd = new FormData(e.currentTarget);
      const result = await signInChild({
        accessCode: fd.get("accessCode") as string,
        pin,
      });
      if (!result.success) {
        setLoading(false);
        setError(result.error);
        return;
      }
      window.location.assign("/learn");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const result = await signInParent({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });
    if (!result.success) {
      setLoading(false);
      setError(result.error);
      return;
    }
    window.location.assign(resolveDestination(result.data.redirectTo));
  }

  function handlePinDigit(value: string) {
    if (pin.length >= PIN_DIGITS) return;
    const next = pin + value;
    setPin(next);
  }

  function handlePinBackspace() {
    setPin((prev) => prev.slice(0, -1));
  }

  return (
    <div className={styles.stepTwo}>
      <button type="button" className={styles.back} onClick={onBack} aria-label="Back to role selection">
        ← Back
      </button>

      <div className={styles.brandRow}>
        <span className={styles.brandMark} aria-hidden="true">
          🦊
        </span>
        <div className={styles.brandText}>
          <span className={styles.brandName}>WiselyFox</span>
          <span className={styles.tagline}>Online learning platform</span>
        </div>
      </div>

      <div className={styles.rolePill}>
        <span className={styles.roleDot} aria-hidden="true" />
        Logging in as <strong>{ROLE_LABEL[role]}</strong>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        {isStudent ? (
          <div className={styles.studentBlock}>
            <label className={styles.fieldLabel} htmlFor="accessCode">
              Access code
            </label>
            <Input
              id="accessCode"
              name="accessCode"
              className={styles.accessCodeInput}
              placeholder="e.g. ABC-123"
              autoComplete="off"
              required
            />
            <label className={styles.fieldLabel} id="pinLabel">
              Your 4-digit picture PIN
            </label>
            <div className={styles.pinRow} role="group" aria-labelledby="pinLabel">
              {Array.from({ length: PIN_DIGITS }).map((_, i) => (
                <span key={i} className={styles.pinSlot} aria-hidden="true">
                  {pin[i] ?? ""}
                </span>
              ))}
            </div>
            <input type="hidden" name="pin" value={pin} />
            <div className={styles.pinPad} aria-label="PIN keypad">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  className={styles.pinKey}
                  onClick={() => handlePinDigit(digit)}
                >
                  {digit}
                </button>
              ))}
              <span className={styles.pinPadSpacer} />
              <button
                type="button"
                className={styles.pinKey}
                onClick={() => handlePinDigit("0")}
              >
                0
              </button>
              <button
                type="button"
                className={styles.pinKey}
                onClick={handlePinBackspace}
                aria-label="Delete last digit"
              >
                ⌫
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.credBlock}>
            <Input
              name="email"
              type="email"
              label="Email address"
              required
              autoComplete="email"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              required
              autoComplete="current-password"
            />
            <div className={styles.oauthRow}>
              <button type="button" className={styles.oauthButton} aria-label="Continue with Google">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Google
              </button>
              <button type="button" className={styles.oauthButton} aria-label="Continue with Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#1877F2" d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button type="submit" className={styles.submit} disabled={isStudent ? pin.length !== PIN_DIGITS : loading}>
            {loading ? "Signing in…" : isStudent ? "Enter learning space" : "Sign in"}
          </button>
        </div>
      </form>

      <div className={styles.footer}>
        <Link href="/forgot-password" className={styles.forgotLink}>
          Forgot password?
        </Link>
        {isStudent ? (
          <p className={styles.legalNote}>
            Your PIN is private and known only to you and your parent. No personal details are
            required to enter your learning space.
          </p>
        ) : (
          <p className={styles.legalNote}>
            By continuing you agree to the{" "}
            <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
