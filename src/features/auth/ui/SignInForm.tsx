"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Card, Alert } from "@/shared/ui";
import { signInWithEmail } from "@/features/auth/actions/auth.actions";
import {
  DEMO_PARENT_EMAIL,
  DEMO_PARENT_PASSWORD,
  DEMO_TUTOR_EMAIL,
  DEMO_TUTOR_PASSWORD,
  DEMO_SUPERADMIN_EMAIL,
  DEMO_SUPERADMIN_PASSWORD,
} from "@/shared/lib/demo-credentials";
import styles from "./auth.module.css";

type SignInFormProps = {
  variant?: "parent" | "tutor";
  callbackUrl?: string;
  registered?: boolean;
};

function DemoCredentials({ variant }: { variant: "parent" | "tutor" }) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const isTutor = variant === "tutor";
  const email = isTutor ? DEMO_TUTOR_EMAIL : DEMO_PARENT_EMAIL;
  const password = isTutor ? DEMO_TUTOR_PASSWORD : DEMO_PARENT_PASSWORD;

  return (
    <Alert variant="info" title={isTutor ? "Demo Tutor" : "Demo Parent"}>
      Email: {email}, Password: {password}
      <br />
      <hr style={{ margin: "8px 0" }} />
      <strong>Super-admin:</strong> {DEMO_SUPERADMIN_EMAIL} (same password)
    </Alert>
  );
}

export function SignInForm({
  variant = "parent",
  callbackUrl,
  registered = false,
}: SignInFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isTutor = variant === "tutor";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await signInWithEmail({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
      role: variant,
    });
    if (!result.success) {
      setLoading(false);
      setError(result.error);
      return;
    }
    const destination =
      callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : result.data.redirectTo;
    // Full navigation applies the session cookie without a double RSC refresh
    window.location.assign(destination);
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.notebookOpen}>
        <div className={styles.bookSpine} aria-hidden="true" />
        <Card className={styles.authCard}>
          <div className={styles.pageMeta}>
            <span>p. 1</span>
            <span>{isTutor ? "Tutor sign in" : "Parent sign in"}</span>
          </div>
          <h1 className={styles.authTitle}>Welcome back</h1>
          <p className={styles.authSubtitle}>
            {isTutor
              ? "Sign in to your tutor dashboard"
              : "Sign in to your parent account"}
          </p>
          {registered && (
            <Alert variant="success" title="Account created">
              {isTutor
                ? "You can sign in with your new tutor account."
                : "You can sign in with your new parent account."}
            </Alert>
          )}
          {error && <Alert variant="error">{error}</Alert>}
          <DemoCredentials variant={variant} />
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input name="email" type="email" label="Email" required autoComplete="email" />
            <Input name="password" type="password" label="Password" required autoComplete="current-password" />
            <div className={styles.formActions}>
              <Button type="submit" loading={loading}>
                {isTutor ? "Sign in as tutor" : "Sign in"}
              </Button>
            </div>
          </form>
          <p className={styles.link}>
            {isTutor ? (
              <>
                New tutor? <Link href="/tutor/sign-up" prefetch>
                  Create free tutor account
                </Link>
              </>
            ) : (
              <>
                No account?{" "}
                <Link href="/sign-up" prefetch>
                  Create parent account
                </Link>
              </>
            )}
          </p>
          <p className={styles.link}>
            {isTutor ? (
              <Link href="/sign-in" prefetch>
                Sign in as parent instead
              </Link>
            ) : (
              <>
                <Link href="/tutor/sign-in" prefetch>
                  Sign in as tutor
                </Link>
                {" · "}
                <Link href="/tutor/sign-up" prefetch>
                  Become a tutor (free)
                </Link>
              </>
            )}
          </p>
          <p className={styles.link}>
            <Link href="/child-sign-in" prefetch>
              Child sign in
            </Link>
          </p>
          <p className={styles.link}>
            <Link href="/tutors" prefetch>
              Browse tutors
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
