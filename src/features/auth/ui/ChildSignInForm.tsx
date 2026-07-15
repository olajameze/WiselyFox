"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Card, Alert } from "@/shared/ui";
import { signInChild } from "@/features/auth/actions/auth.actions";
import {
  DEMO_CHILD_ACCESS_CODE,
  DEMO_CHILD_PIN,
} from "@/shared/lib/demo-credentials";
import styles from "./auth.module.css";

export function ChildSignInForm({ consentError = false }: { consentError?: boolean }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await signInChild({
      accessCode: fd.get("accessCode") as string,
      pin: fd.get("pin") as string,
    });
    if (!result.success) {
      setLoading(false);
      setError(result.error);
      return;
    }
    window.location.assign("/learn");
  }

  return (
    <div className={styles.authPage}>
      <Card className={`${styles.authCard} ${styles.childAuthCard}`}>
        <h1 className={styles.authTitle}>Hi there!</h1>
        <p className={styles.authSubtitle}>Enter your access code and PIN from your parent</p>
        {consentError && (
          <Alert variant="warning" title="Learning paused">
            A parent must renew child data consent in Settings before learning can continue.
          </Alert>
        )}
        {error && <Alert variant="error">{error}</Alert>}
        <Alert variant="info" title="Demo learner">
          Access code: {DEMO_CHILD_ACCESS_CODE}, PIN: {DEMO_CHILD_PIN}
        </Alert>
        <form className={`${styles.form} ${styles.childForm}`} onSubmit={handleSubmit}>
          <div className={styles.fieldAccessCode}>
            <Input name="accessCode" label="Access code" required autoComplete="off" />
          </div>
          <div className={styles.fieldPin}>
            <Input
              name="pin"
              type="password"
              label="PIN"
              required
              inputMode="numeric"
              autoComplete="off"
              maxLength={6}
            />
          </div>
          <div className={styles.formActions}>
            <Button type="submit" loading={loading}>
              Let&apos;s learn
            </Button>
          </div>
        </form>
        <p className={styles.link}>
          <Link href="/sign-in" prefetch>
            Parent sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
