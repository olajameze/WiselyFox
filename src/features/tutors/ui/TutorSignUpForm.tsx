"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpTutor } from "@/features/tutors/actions/tutor-onboarding.actions";
import { TutorFeeDisclosure } from "./TutorFeeDisclosure";
import { TUTOR_TERMS_COPY } from "@/features/tutors/lib/tutor-consent";
import { Button, Alert } from "@/shared/ui";
import styles from "./tutor.module.css";

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
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
      dateOfBirth: String(fd.get("dateOfBirth") ?? ""),
      feeAccepted,
      termsAccepted,
    });
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push(`/sign-in?registered=tutor&email=${encodeURIComponent(result.data.email)}`);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <Alert variant="error">{error}</Alert>}
      <div className={styles.field}>
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" required minLength={2} />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={8} />
      </div>
      <div className={styles.field}>
        <label htmlFor="dateOfBirth">Date of birth (must be 18+)</label>
        <input id="dateOfBirth" name="dateOfBirth" type="date" required />
      </div>
      <TutorFeeDisclosure feeAccepted={feeAccepted} onFeeAcceptedChange={setFeeAccepted} />
      <div className={styles.feeBox}>
        <h3>{TUTOR_TERMS_COPY.title}</h3>
        <p>{TUTOR_TERMS_COPY.body}</p>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <span>I accept the tutor marketplace terms</span>
        </label>
      </div>
      <Button type="submit" disabled={loading || !feeAccepted || !termsAccepted}>
        {loading ? "Creating account…" : "Create tutor account"}
      </Button>
    </form>
  );
}
