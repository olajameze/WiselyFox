"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTutorCvUrl, removeTutorCv } from "@/features/tutors/actions/tutor-profile.actions";
import { Button, Alert } from "@/shared/ui";
import styles from "./tutor.module.css";

type Props = {
  currentCvUrl?: string | null;
};

export function TutorCvUpload({ currentCvUrl }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("CV must be under 5MB");
      return;
    }

    setError(null);
    setLoading(true);

    const body = new FormData();
    body.append("cv", file);

    try {
      const res = await fetch("/api/tutor/cv", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Upload failed");
        setLoading(false);
        return;
      }

      const saveResult = await setTutorCvUrl(data.url);
      if (!saveResult.success) {
        setError(saveResult.error);
        setLoading(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Upload failed");
    }
    setLoading(false);
  }

  async function handleRemove() {
    setLoading(true);
    const result = await removeTutorCv();
    setLoading(false);
    if (!result.success) setError(result.error);
    else router.refresh();
  }

  return (
    <div>
      <p className={styles.meta}>Optional — parents can view your CV on your public profile.</p>
      {currentCvUrl && (
        <p>
          <a href={currentCvUrl} target="_blank" rel="noopener noreferrer">
            View current CV
          </a>
          {" · "}
          <Button type="button" variant="ghost" onClick={handleRemove} disabled={loading}>
            Remove CV
          </Button>
        </p>
      )}
      <div className={styles.field}>
        <label htmlFor="tutor-cv">Upload CV (PDF, optional)</label>
        <input
          id="tutor-cv"
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          disabled={loading}
        />
      </div>
      {error && <Alert variant="error">{error}</Alert>}
      {loading && <p className={styles.meta}>Uploading…</p>}
    </div>
  );
}
