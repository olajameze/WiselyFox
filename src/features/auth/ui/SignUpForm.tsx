"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Card, Alert } from "@/shared/ui";
import { signUpParent } from "@/features/auth/actions/auth.actions";
import styles from "./auth.module.css";

export function SignUpForm({ plan = "essential" }: { plan?: string }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await signUpParent({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      password: fd.get("password") as string,
      marketingOptIn: fd.get("marketing") === "on",
      termsAccepted: fd.get("terms") === "on",
      privacyAccepted: fd.get("privacy") === "on",
    });
    if (!result.success) {
      setLoading(false);
      setError(result.error);
      return;
    }
    window.location.assign(`/sign-in?registered=1&plan=${encodeURIComponent(plan)}`);
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.notebookOpen}>
        <div className={styles.bookSpine} aria-hidden="true" />
        <Card className={styles.authCard}>
          <div className={styles.pageMeta}>
            <span>p. 1</span>
            <span>New parent account</span>
          </div>
          <h1 className={styles.authTitle}>Create your parent account</h1>
          <p className={styles.authSubtitle}>
            Family pilot, free access, no card, {plan === "family" ? "Family" : "Essential"} plan
          </p>
          {error && <Alert variant="error">{error}</Alert>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input name="name" label="Your name" required autoComplete="name" />
            <Input name="email" type="email" label="Email" required autoComplete="email" />
            <Input
              name="password"
              type="password"
              label="Password"
              required
              minLength={8}
              helperText="At least 8 characters"
              autoComplete="new-password"
            />
            <label className={styles.checkbox}>
              <input type="checkbox" name="terms" required />
              <span>
                I agree to the{" "}
                <Link href="/terms" target="_blank">
                  Terms of Service
                </Link>
              </span>
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" name="privacy" required />
              <span>
                I agree to the{" "}
                <Link href="/privacy" target="_blank">
                  Privacy Policy
                </Link>
              </span>
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" name="marketing" />
              <span>Send me product tips and updates (optional)</span>
            </label>
            <p className={styles.legalNote}>
              Child learning data is collected only after you give explicit consent when adding a
              child profile. We never sell identifiable child data.
            </p>
            <div className={styles.formActions}>
              <Button type="submit" loading={loading}>
                Create account
              </Button>
            </div>
          </form>
          <p className={styles.link}>
            Already have an account?{" "}
            <Link href="/sign-in" prefetch>
              Sign in
            </Link>
          </p>
          <p className={styles.link}>
            Want to tutor instead?{" "}
            <Link href="/tutor/sign-up" prefetch>
              Create free tutor account
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
