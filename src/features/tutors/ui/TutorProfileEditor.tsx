"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  updateTutorProfile,
  submitTutorProfileForReview,
} from "@/features/tutors/actions/tutor-profile.actions";
import { startTutorStripeOnboarding } from "@/features/tutors/actions/tutor-booking.actions";
import { TutorPhotoUpload } from "./TutorPhotoUpload";
import { TutorCvUpload } from "./TutorCvUpload";
import { parseJsonArray } from "@/features/tutors/services/tutor-profile.service";
import { Button, Alert, Badge } from "@/shared/ui";
import styles from "./tutor.module.css";
import type { TutorProfile } from "@prisma/client";

const SUBJECT_OPTIONS = ["Maths", "English", "Science", "History", "Geography", "Computing", "Languages"];
const AGE_BAND_OPTIONS = ["5-7", "8-10", "11-13", "14-16", "17-19"];

type Props = {
  tutor: TutorProfile;
};

export function TutorProfileEditor({ tutor }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const subjects = parseJsonArray(tutor.subjects);
  const ageBands = parseJsonArray(tutor.ageBands);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const selectedSubjects = SUBJECT_OPTIONS.filter((s) => fd.get(`subject-${s}`) === "on");
    const selectedBands = AGE_BAND_OPTIONS.filter((b) => fd.get(`band-${b}`) === "on");

    const result = await updateTutorProfile({
      headline: String(fd.get("headline") ?? ""),
      bio: String(fd.get("bio") ?? ""),
      experienceSummary: String(fd.get("experienceSummary") ?? ""),
      subjects: selectedSubjects,
      ageBands: selectedBands,
      qualifications: String(fd.get("qualifications") ?? "")
        .split(",")
        .map((q) => q.trim())
        .filter(Boolean),
      hourlyRatePence: Math.round(Number(fd.get("hourlyRate")) * 100),
      acceptsDeposits: fd.get("acceptsDeposits") === "on",
      depositPercent: fd.get("acceptsDeposits") === "on" ? Number(fd.get("depositPercent")) : undefined,
    });
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setSuccess("Profile saved");
    router.refresh();
  }

  async function handleSubmitReview() {
    setError(null);
    const result = await submitTutorProfileForReview();
    if (!result.success) setError(result.error);
    else {
      setSuccess("Submitted for admin review");
      router.refresh();
    }
  }

  async function handleStripe() {
    const result = await startTutorStripeOnboarding();
    if (!result.success) setError(result.error);
    else window.location.href = result.data.url;
  }

  return (
    <div>
      <p>
        Status: <Badge>{tutor.verificationStatus}</Badge>
        {tutor.published && <> · <Badge variant="success">Published</Badge></>}
      </p>

      <TutorPhotoUpload currentPhotoUrl={tutor.profilePhotoUrl} />
      <TutorCvUpload currentCvUrl={tutor.cvUrl} />

      <form className={styles.form} onSubmit={handleSave}>
        {error && <Alert variant="error">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <div className={styles.field}>
          <label htmlFor="headline">Headline</label>
          <input id="headline" name="headline" defaultValue={tutor.headline} required minLength={5} />
        </div>
        <div className={styles.field}>
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" name="bio" rows={5} defaultValue={tutor.bio} required minLength={20} />
        </div>
        <div className={styles.field}>
          <label htmlFor="experienceSummary">Experience (optional)</label>
          <textarea
            id="experienceSummary"
            name="experienceSummary"
            rows={4}
            defaultValue={tutor.experienceSummary}
            placeholder="Years tutoring, classroom experience, specialist areas…"
          />
        </div>
        <fieldset className={styles.field}>
          <legend>Subjects</legend>
          {SUBJECT_OPTIONS.map((s) => (
            <label key={s} className={styles.checkboxRow}>
              <input type="checkbox" name={`subject-${s}`} defaultChecked={subjects.includes(s)} />
              <span>{s}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className={styles.field}>
          <legend>Age bands</legend>
          {AGE_BAND_OPTIONS.map((b) => (
            <label key={b} className={styles.checkboxRow}>
              <input type="checkbox" name={`band-${b}`} defaultChecked={ageBands.includes(b)} />
              <span>{b}</span>
            </label>
          ))}
        </fieldset>
        <div className={styles.field}>
          <label htmlFor="qualifications">Qualifications & skills (comma-separated)</label>
          <input
            id="qualifications"
            name="qualifications"
            defaultValue={parseJsonArray(tutor.qualifications).join(", ")}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="hourlyRate">Hourly rate (£)</label>
          <input
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            min={5}
            max={500}
            step={0.5}
            defaultValue={(tutor.hourlyRatePence / 100).toFixed(2)}
            required
          />
        </div>
        <label className={styles.checkboxRow}>
          <input type="checkbox" name="acceptsDeposits" defaultChecked={tutor.acceptsDeposits} />
          <span>Accept deposits</span>
        </label>
        <div className={styles.field}>
          <label htmlFor="depositPercent">Deposit percent</label>
          <input
            id="depositPercent"
            name="depositPercent"
            type="number"
            min={10}
            max={50}
            defaultValue={tutor.depositPercent ?? 25}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save profile"}
        </Button>
      </form>

      <div className={styles.mtLg}>
        <Button variant="secondary" onClick={handleSubmitReview}>
          Submit for verification
        </Button>
        <Button variant="ghost" onClick={handleStripe} className={styles.mtLg}>
          {tutor.stripeAccountId ? "Update payment setup" : "Set up payments (Stripe)"}
        </Button>
      </div>
    </div>
  );
}
