"use client";

import { useState } from "react";
import { saveTutorOnboardingAction } from "@/features/tutors/actions/tutor-onboarding.actions";
import styles from "./OnboardingUploads.module.css";

interface DocState {
  url: string | null;
  name: string | null;
  uploading: boolean;
  error: string | null;
}

interface OnboardingUploadsProps {
  initialDbsUrl?: string | null;
  initialPhotoIdUrl?: string | null;
  initialProofOfAddressUrl?: string | null;
  onSuccess?: () => void;
}

export function OnboardingUploads({
  initialDbsUrl = null,
  initialPhotoIdUrl = null,
  initialProofOfAddressUrl = null,
  onSuccess,
}: OnboardingUploadsProps) {
  const [dbs, setDbs] = useState<DocState>({
    url: initialDbsUrl,
    name: initialDbsUrl ? "DBS Certificate Attached" : null,
    uploading: false,
    error: null,
  });

  const [photoId, setPhotoId] = useState<DocState>({
    url: initialPhotoIdUrl,
    name: initialPhotoIdUrl ? "Photo ID Attached" : null,
    uploading: false,
    error: null,
  });

  const [proofOfAddress, setProofOfAddress] = useState<DocState>({
    url: initialProofOfAddressUrl,
    name: initialProofOfAddressUrl ? "Proof of Address Attached" : null,
    uploading: false,
    error: null,
  });

  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleFileUpload(file: File, docType: "dbs" | "photoId" | "proofOfAddress") {
    const setter =
      docType === "dbs"
        ? setDbs
        : docType === "photoId"
          ? setPhotoId
          : setProofOfAddress;

    setter((prev) => ({ ...prev, uploading: true, error: null }));
    setGlobalError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", docType);

      const res = await fetch("/api/tutor/documents", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Upload failed. Please try again.");
      }

      setter({
        url: data.url,
        name: file.name,
        uploading: false,
        error: null,
      });
    } catch (err) {
      setter((prev) => ({
        ...prev,
        uploading: false,
        error: err instanceof Error ? err.message : String(err),
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGlobalError(null);

    if (!dbs.url || !photoId.url || !proofOfAddress.url) {
      setGlobalError("Please upload all three mandatory verification documents before submitting.");
      return;
    }

    setSubmitting(true);
    const result = await saveTutorOnboardingAction({
      dbsLetterUrl: dbs.url,
      photoIdUrl: photoId.url,
      proofOfAddressUrl: proofOfAddress.url,
    });
    setSubmitting(false);

    if (!result.success) {
      setGlobalError(result.error);
      return;
    }

    setSubmitted(true);
    onSuccess?.();
  }

  const allUploaded = Boolean(dbs.url && photoId.url && proofOfAddress.url);

  if (submitted) {
    return (
      <div className={styles.wizardCard}>
        <div className={styles.successCard}>
          <div className={styles.successIcon} aria-hidden="true">
            🛡️
          </div>
          <h2 className={styles.wizardTitle}>Documents Received!</h2>
          <p className={styles.wizardSubtitle}>
            Your DBS certificate, photo ID, and proof of address have been securely submitted for compliance review.
          </p>
          <div className={styles.noticeBanner} style={{ marginTop: "1.5rem" }}>
            <span className={styles.noticeIcon} aria-hidden="true">
              🔒
            </span>
            <div>
              <strong>Read-Only Lock Active:</strong> For child safety compliance, your tutor workspace remains in a read-only lock state until a WiselyFox Administrator verifies your credentials.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wizardCard}>
      <header className={styles.wizardHeader}>
        <h2 className={styles.wizardTitle}>Tutor Safety Verification</h2>
        <p className={styles.wizardSubtitle}>
          To protect children on WiselyFox, all tutors must provide three verified background check documents before accessing marketplaces or assigning lessons.
        </p>
      </header>

      <div className={styles.noticeBanner}>
        <span className={styles.noticeIcon} aria-hidden="true">
          ℹ️
        </span>
        <div>
          <strong>Mandatory Compliance:</strong> All accounts remain locked in read-only mode until manual Admin review is completed. Accepted formats: PDF, PNG, JPEG (up to 10MB).
        </div>
      </div>

      {globalError && <div className={styles.errorMessage} role="alert">{globalError}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.documentsGrid}>
          {/* Document 1: DBS Certificate */}
          <div
            className={[
              styles.docItem,
              dragOverKey === "dbs" ? styles.docItemDragging : "",
              dbs.url ? styles.docItemUploaded : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverKey("dbs");
            }}
            onDragLeave={() => setDragOverKey(null)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOverKey(null);
              const file = e.dataTransfer.files?.[0];
              if (file) void handleFileUpload(file, "dbs");
            }}
          >
            <div className={styles.docHeader}>
              <span className={styles.docLabel}>
                <span>📄</span> 1. Official DBS Certificate Letter
              </span>
              <span
                className={[
                  styles.docStatusBadge,
                  dbs.url ? styles.docStatusUploaded : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {dbs.uploading ? "Uploading..." : dbs.url ? "✓ Attached" : "Required"}
              </span>
            </div>
            <p className={styles.docDesc}>
              Enhanced DBS check certificate or official update service certificate issued within the UK.
            </p>
            <div className={styles.dropZoneAction}>
              <label className={styles.uploadTriggerBtn}>
                <span>{dbs.url ? "Change File" : "Choose File / Drop"}</span>
                <input
                  type="file"
                  className={styles.fileInput}
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleFileUpload(file, "dbs");
                  }}
                />
              </label>
              {dbs.name && <span className={styles.fileName}>{dbs.name}</span>}
            </div>
            {dbs.error && <p className={styles.errorMessage}>{dbs.error}</p>}
          </div>

          {/* Document 2: Government Photo ID */}
          <div
            className={[
              styles.docItem,
              dragOverKey === "photoId" ? styles.docItemDragging : "",
              photoId.url ? styles.docItemUploaded : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverKey("photoId");
            }}
            onDragLeave={() => setDragOverKey(null)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOverKey(null);
              const file = e.dataTransfer.files?.[0];
              if (file) void handleFileUpload(file, "photoId");
            }}
          >
            <div className={styles.docHeader}>
              <span className={styles.docLabel}>
                <span>🪪</span> 2. Government Photo ID
              </span>
              <span
                className={[
                  styles.docStatusBadge,
                  photoId.url ? styles.docStatusUploaded : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {photoId.uploading ? "Uploading..." : photoId.url ? "✓ Attached" : "Required"}
              </span>
            </div>
            <p className={styles.docDesc}>
              Valid Passport or UK Driver’s Licence photo with matching legal name.
            </p>
            <div className={styles.dropZoneAction}>
              <label className={styles.uploadTriggerBtn}>
                <span>{photoId.url ? "Change File" : "Choose File / Drop"}</span>
                <input
                  type="file"
                  className={styles.fileInput}
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleFileUpload(file, "photoId");
                  }}
                />
              </label>
              {photoId.name && <span className={styles.fileName}>{photoId.name}</span>}
            </div>
            {photoId.error && <p className={styles.errorMessage}>{photoId.error}</p>}
          </div>

          {/* Document 3: Proof of Address */}
          <div
            className={[
              styles.docItem,
              dragOverKey === "proofOfAddress" ? styles.docItemDragging : "",
              proofOfAddress.url ? styles.docItemUploaded : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverKey("proofOfAddress");
            }}
            onDragLeave={() => setDragOverKey(null)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOverKey(null);
              const file = e.dataTransfer.files?.[0];
              if (file) void handleFileUpload(file, "proofOfAddress");
            }}
          >
            <div className={styles.docHeader}>
              <span className={styles.docLabel}>
                <span>🏠</span> 3. Proof of Address Document
              </span>
              <span
                className={[
                  styles.docStatusBadge,
                  proofOfAddress.url ? styles.docStatusUploaded : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {proofOfAddress.uploading ? "Uploading..." : proofOfAddress.url ? "✓ Attached" : "Required"}
              </span>
            </div>
            <p className={styles.docDesc}>
              Recent utility bill, council tax statement, or bank statement dated within the last 3 months.
            </p>
            <div className={styles.dropZoneAction}>
              <label className={styles.uploadTriggerBtn}>
                <span>{proofOfAddress.url ? "Change File" : "Choose File / Drop"}</span>
                <input
                  type="file"
                  className={styles.fileInput}
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleFileUpload(file, "proofOfAddress");
                  }}
                />
              </label>
              {proofOfAddress.name && <span className={styles.fileName}>{proofOfAddress.name}</span>}
            </div>
            {proofOfAddress.error && <p className={styles.errorMessage}>{proofOfAddress.error}</p>}
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!allUploaded || submitting}
        >
          {submitting ? "Submitting for Verification..." : "Submit Verification Documents"}
        </button>
      </form>
    </div>
  );
}

export default OnboardingUploads;
