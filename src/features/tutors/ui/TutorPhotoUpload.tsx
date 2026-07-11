"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setTutorProfilePhoto } from "@/features/tutors/actions/tutor-profile.actions";
import { Button, Alert } from "@/shared/ui";
import styles from "./tutor.module.css";

type Props = {
  currentPhotoUrl?: string | null;
};

export function TutorPhotoUpload({ currentPhotoUrl }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentPhotoUrl ?? null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Please upload a JPEG, PNG, or WebP image");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2MB");
      return;
    }

    setError(null);
    setLoading(true);

    const body = new FormData();
    body.append("photo", file);

    try {
      const res = await fetch("/api/tutor/photo", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Upload failed");
        setLoading(false);
        return;
      }

      const saveResult = await setTutorProfilePhoto(data.url);
      if (!saveResult.success) {
        setError(saveResult.error);
        setLoading(false);
        return;
      }

      setPreview(data.url);
      router.refresh();
    } catch {
      setError("Upload failed");
    }
    setLoading(false);
  }

  return (
    <div>
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Your profile" className={styles.photoPreview} />
      )}
      <div className={styles.field}>
        <label htmlFor="tutor-photo">Profile photo (required)</label>
        <input
          id="tutor-photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleUpload}
          disabled={loading}
        />
      </div>
      {error && <Alert variant="error">{error}</Alert>}
      {loading && <p className={styles.meta}>Uploading…</p>}
      {!preview && (
        <p className={styles.meta}>A profile photo is required before your listing can be verified.</p>
      )}
    </div>
  );
}
