"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn as nextAuthSignIn } from "next-auth/react";
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
              <Button type="submit" loading={loading} className={styles.fullWidthBtn}>
                Create account
              </Button>
            </div>

            <div className={styles.oauthDivider}>
              <span>or continue with</span>
            </div>

            <div className={styles.oauthRow}>
              <button
                type="button"
                className={styles.oauthButton}
                aria-label="Sign up with Google"
                onClick={() => nextAuthSignIn("google", { callbackUrl: "/parent/onboarding" })}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className={styles.oauthButton}
                aria-label="Sign up with Facebook"
                onClick={() => nextAuthSignIn("facebook", { callbackUrl: "/parent/onboarding" })}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="#1877F2" d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07z" />
                </svg>
                Facebook
              </button>
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
