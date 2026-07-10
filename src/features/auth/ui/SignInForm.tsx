"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input, Card, Alert } from "@/shared/ui";
import { signInParent } from "@/features/auth/actions/auth.actions";
import styles from "./auth.module.css";

type SignInFormProps = {
  variant?: "parent" | "tutor";
};

export function SignInForm({ variant = "parent" }: SignInFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isTutor = variant === "tutor";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await signInParent({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    const destination =
      callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : result.data.redirectTo;
    router.push(destination);
    router.refresh();
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
          {error && <Alert variant="error">{error}</Alert>}
          {!isTutor && (
            <Alert variant="info" title="Demo accounts">
              Parent: parent@demo.wiselyfox.test / demo123456, Admin: admin@wiselyfox.test / admin123456
            </Alert>
          )}
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
                New tutor? <Link href="/tutor/sign-up">Create free tutor account</Link>
              </>
            ) : (
              <>
                No account? <Link href="/sign-up">Create parent account</Link>
              </>
            )}
          </p>
          <p className={styles.link}>
            {isTutor ? (
              <Link href="/sign-in">Sign in as parent instead</Link>
            ) : (
              <>
                <Link href="/tutor/sign-in">Sign in as tutor</Link>
                {" · "}
                <Link href="/tutor/sign-up">Become a tutor (free)</Link>
              </>
            )}
          </p>
          <p className={styles.link}>
            <Link href="/child-sign-in">Child sign in</Link>
          </p>
          <p className={styles.link}>
            <Link href="/tutors">Browse tutors</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
