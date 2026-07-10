"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendTutorInquiry } from "@/features/tutors/actions/tutor-booking.actions";
import { Button, Alert } from "@/shared/ui";
import styles from "./tutor.module.css";

type Props = {
  tutorId: string;
  householdChildren: { id: string; displayName: string }[];
};

export function TutorInquiryForm({ tutorId, householdChildren }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const childId = String(fd.get("childId") ?? "");
    const result = await sendTutorInquiry({
      tutorId,
      message: String(fd.get("message") ?? ""),
      childId: childId || undefined,
    });
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setSent(true);
    router.refresh();
  }

  if (sent) return <Alert variant="success">Your message has been sent to the tutor.</Alert>;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <Alert variant="error">{error}</Alert>}
      {householdChildren.length > 0 && (
        <div className={styles.field}>
          <label htmlFor="childId">Related child (optional)</label>
          <select id="childId" name="childId">
            <option value="">No specific child</option>
            {householdChildren.map((c) => (
              <option key={c.id} value={c.id}>
                {c.displayName}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} required minLength={10} maxLength={1000} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Contact tutor"}
      </Button>
    </form>
  );
}
