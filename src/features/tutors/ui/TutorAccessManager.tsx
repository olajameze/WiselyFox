"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  grantTutorAccessToChild,
  revokeTutorAccessFromChild,
} from "@/features/tutors/actions/tutor-booking.actions";
import { Button, Alert } from "@/shared/ui";
import styles from "./tutor.module.css";

type AccessRow = {
  id: string;
  learnerAlias: string;
  status: string;
  tutorHeadline: string;
};

type Props = {
  childId: string;
  tutors: { id: string; headline: string }[];
  existingAccess: AccessRow[];
};

export function TutorAccessManager({ childId, tutors, existingAccess }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGrant(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const result = await grantTutorAccessToChild({
      tutorId: String(fd.get("tutorId") ?? ""),
      childId,
      learnerAlias: String(fd.get("learnerAlias") ?? ""),
      consentGranted: fd.get("consentGranted") === "on",
    });
    setLoading(false);
    if (!result.success) setError(result.error);
    else router.refresh();
  }

  async function handleRevoke(accessId: string) {
    setError(null);
    const result = await revokeTutorAccessFromChild({ accessId });
    if (!result.success) setError(result.error);
    else router.refresh();
  }

  return (
    <div>
      {error && <Alert variant="error">{error}</Alert>}

      <form className={styles.form} onSubmit={handleGrant}>
        <h3>Grant tutor access</h3>
        <p className={styles.meta}>
          Tutors see learning progress only, never your child&apos;s profile, PIN, or access code.
        </p>
        <div className={styles.field}>
          <label htmlFor="tutorId">Verified tutor</label>
          <select id="tutorId" name="tutorId" required>
            <option value="">Select tutor</option>
            {tutors.map((t) => (
              <option key={t.id} value={t.id}>
                {t.headline}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="learnerAlias">Learner alias (pseudonym)</label>
          <input
            id="learnerAlias"
            name="learnerAlias"
            required
            minLength={2}
            maxLength={40}
            placeholder="e.g. Learner A"
          />
        </div>
        <label className={styles.checkboxRow}>
          <input type="checkbox" name="consentGranted" required />
          <span>I consent to share learning progress with this tutor under the alias above.</span>
        </label>
        <Button type="submit" disabled={loading || tutors.length === 0}>
          Grant access
        </Button>
      </form>

      {existingAccess.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Alias</th>
              <th>Tutor</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {existingAccess.map((row) => (
              <tr key={row.id}>
                <td>{row.learnerAlias}</td>
                <td>{row.tutorHeadline}</td>
                <td>{row.status}</td>
                <td>
                  {row.status === "ACTIVE" && (
                    <Button variant="ghost" onClick={() => handleRevoke(row.id)}>
                      Revoke
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
