"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Card, Alert } from "@/shared/ui";
import { signInChild } from "@/features/auth/actions/auth.actions";
import styles from "./auth.module.css";

export function ChildSignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const consentError = params.get("error") === "consent";
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
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push("/learn");
    router.refresh();
  }

  return (
    <div className={styles.authPage}>
      <Card className={styles.authCard}>
        <h1 className={styles.authTitle}>Hi there!</h1>
        <p className={styles.authSubtitle}>Enter your access code and PIN from your parent</p>
        {consentError && (
          <Alert variant="warning" title="Learning paused">
            A parent must renew child data consent in Settings before learning can continue.
          </Alert>
        )}
        {error && <Alert variant="error">{error}</Alert>}
        <Alert variant="info" title="Demo learner">
          Access code: wfox demo alex, PIN: 1234
        </Alert>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input name="accessCode" label="Access code" required autoComplete="off" />
          <Input
            name="pin"
            type="password"
            label="PIN"
            required
            inputMode="numeric"
            autoComplete="off"
          />
          <div className={styles.formActions}>
            <Button type="submit" loading={loading}>
              Let&apos;s learn
            </Button>
          </div>
        </form>
        <p className={styles.link}>
          <Link href="/sign-in">Parent sign in</Link>
        </p>
      </Card>
    </div>
  );
}
