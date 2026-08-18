"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpTutor } from "@/features/tutors/actions/tutor-onboarding.actions";
import { TutorFeeDisclosure } from "./TutorFeeDisclosure";
import { TUTOR_TERMS_COPY } from "@/features/tutors/lib/tutor-consent";
import { Button, Input, Card, Alert } from "@/shared/ui";
import styles from "@/features/auth/ui/auth.module.css";
import tutorStyles from "./tutor.module.css";

export function TutorSignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [feeAccepted, setFeeAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const result = await signUpTutor({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      password: fd.get("password") as string,
      dateOfBirth: fd.get("dateOfBirth") as string,
      feeAccepted,
      termsAccepted,
    });

    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    
    // Redirect to the tutor sign-in page with a success indicator
    router.push("/tutor/sign-in?registered=true");
  }

  return (
    <Card className={styles.authCard}>
      <div className={styles.pageMeta}>
        <span>p. 1</span>
        <span>Tutor sign up</span>
      </div>
      <h1 className={styles.authTitle}>Become a Tutor</h1>
      <p className={styles.authSubtitle}>Create a free account to offer tutoring on WiselyFox.</p>
      
      {error && <Alert variant="error">{error}</Alert>}
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input name="name" label="Full Name" required autoComplete="name" />
        <Input name="email" type="email" label="Email" required autoComplete="email" />
        <Input name="password" type="password" label="Password (min. 8 characters)" required autoComplete="new-password" />
        
        <div className={tutorStyles.field}>
          <label htmlFor="dateOfBirth">Date of birth (must be 18+)</label>
          <input id="dateOfBirth" name="dateOfBirth" type="date" required />
        </div>

        <TutorFeeDisclosure feeAccepted={feeAccepted} onFeeAcceptedChange={setFeeAccepted} id="signup-fee" />
        
        <div className={tutorStyles.feeBox}>
          <h3>{TUTOR_TERMS_COPY.title}</h3>
          <p>{TUTOR_TERMS_COPY.body}</p>
          <label className={tutorStyles.checkboxRow}>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <span>I accept the tutor marketplace terms</span>
          </label>
        </div>

        <div className={styles.formActions}>
            <Button type="submit" disabled={loading || !feeAccepted || !termsAccepted}>
                {loading ? "Creating Account…" : "Create Tutor Account"}
            </Button>
        </div>
      </form>
      
      <p className={styles.link}>
        Already have an account?{" "}
        <Link href="/tutor/sign-in" prefetch>
          Sign in as tutor
        </Link>
      </p>
    </Card>
  );
}
