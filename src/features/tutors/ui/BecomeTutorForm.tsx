"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { becomeTutor } from "@/features/tutors/actions/tutor-onboarding.actions";
import { TutorFeeDisclosure } from "./TutorFeeDisclosure";
import { TUTOR_TERMS_COPY } from "@/features/tutors/lib/tutor-consent";
import { Button, Alert } from "@/shared/ui";
import styles from "./tutor.module.css";

export function BecomeTutorForm() {
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
    const result = await becomeTutor({
      dateOfBirth: String(fd.get("dateOfBirth") ?? ""),
      feeAccepted,
      termsAccepted,
    });
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.push("/tutor/profile");
    router.refresh();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <Alert variant="error">{error}</Alert>}
      <div className={styles.field}>
        <label htmlFor="dateOfBirth">Date of birth (must be 18+)</label>
        <input id="dateOfBirth" name="dateOfBirth" type="date" required />
      </div>
      <TutorFeeDisclosure feeAccepted={feeAccepted} onFeeAcceptedChange={setFeeAccepted} id="become-fee" />
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
        {loading ? "Setting up…" : "Become a tutor"}
      </Button>
    </form>
  );
}
