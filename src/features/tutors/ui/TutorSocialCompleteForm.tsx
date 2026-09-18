"use client";

import { useState } from "react";
import { Button, Card, Alert } from "@/shared/ui";
import { TutorFeeDisclosure } from "./TutorFeeDisclosure";
import { TUTOR_TERMS_COPY } from "@/features/tutors/lib/tutor-consent";
import { signUpTutorSocial } from "@/features/tutors/actions/tutor-onboarding.actions";
import styles from "@/features/auth/ui/auth.module.css";
import tutorStyles from "./tutor.module.css";

type TutorSocialCompleteFormProps = {
  name: string;
  email: string;
};

/**
 * Second step of social tutor sign-up: the user has already authenticated
 * with Google/Facebook, so we only collect date of birth and consents.
 */
export function TutorSocialCompleteForm({ name, email }: TutorSocialCompleteFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [feeAccepted, setFeeAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const result = await signUpTutorSocial({
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      dateOfBirth: fd.get("dateOfBirth") as string,
      feeAccepted,
      termsAccepted,
    });

    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }

    window.location.assign("/tutor");
  }

  return (
    <Card className={styles.authCard}>
      <div className={styles.pageMeta}>
        <span>p. 2</span>
        <span>Tutor registration</span>
      </div>
      <h1 className={styles.authTitle}>Finish your tutor profile</h1>
      <p className={styles.authSubtitle}>
        You&apos;re signed in as {name} ({email}). Add a few details to finish.
      </p>

      {error && <Alert variant="error">{error}</Alert>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="name" value={name} />
        <div className={tutorStyles.field}>
          <label htmlFor="dateOfBirth">Date of birth (must be 18+)</label>
          <input id="dateOfBirth" name="dateOfBirth" type="date" required />
        </div>

        <TutorFeeDisclosure feeAccepted={feeAccepted} onFeeAcceptedChange={setFeeAccepted} id="social-fee" />

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
            {loading ? "Creating profile…" : "Finish tutor registration"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
