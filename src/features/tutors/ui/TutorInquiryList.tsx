"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { respondToTutorInquiry } from "@/features/tutors/actions/tutor-booking.actions";
import { Button, Alert } from "@/shared/ui";
import styles from "./tutor.module.css";

type Inquiry = {
  id: string;
  message: string;
  response: string | null;
  status: string;
  createdAt: string;
};

export function TutorInquiryList({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [replyingId, setReplyingId] = useState<string | null>(null);

  async function handleReply(e: React.FormEvent<HTMLFormElement>, inquiryId: string) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const result = await respondToTutorInquiry({
      inquiryId,
      response: String(fd.get("response") ?? ""),
    });
    if (!result.success) setError(result.error);
    else {
      setReplyingId(null);
      router.refresh();
    }
  }

  if (inquiries.length === 0) {
    return <p className={styles.meta}>No inquiries yet.</p>;
  }

  return (
    <div>
      {error && <Alert variant="error">{error}</Alert>}
      {inquiries.map((inq) => (
        <div key={inq.id} className={styles.mtLg}>
          <p>
            <strong>{new Date(inq.createdAt).toLocaleDateString("en-GB")}</strong> · {inq.status}
          </p>
          <p>{inq.message}</p>
          {inq.response && (
            <p className={styles.meta}>
              <strong>Your reply:</strong> {inq.response}
            </p>
          )}
          {!inq.response && (
            <>
              {replyingId === inq.id ? (
                <form className={styles.form} onSubmit={(e) => handleReply(e, inq.id)}>
                  <div className={styles.field}>
                    <label htmlFor={`inquiry-reply-${inq.id}`}>Your reply</label>
                    <textarea
                      id={`inquiry-reply-${inq.id}`}
                      name="response"
                      rows={3}
                      required
                      minLength={5}
                      placeholder="Write your response to the parent"
                    />
                  </div>
                  <Button type="submit">Send reply</Button>
                  <Button type="button" variant="ghost" onClick={() => setReplyingId(null)}>
                    Cancel
                  </Button>
                </form>
              ) : (
                <Button variant="secondary" onClick={() => setReplyingId(inq.id)}>
                  Reply
                </Button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
