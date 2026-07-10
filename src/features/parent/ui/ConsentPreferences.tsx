"use client";

import { useState } from "react";
import { Alert, Button } from "@/shared/ui";
import {
  updateMarketingConsent,
  withdrawChildDataConsent,
} from "@/features/parent/actions/consent.actions";
import { CONSENT_COPY, CONSENT_VERSION } from "@/shared/lib/consent";
import styles from "@/features/parent/ui/parent.module.css";

interface ConsentPreferencesProps {
  marketingOptIn: boolean;
  childDataOptIn: boolean;
}

export function ConsentPreferences({ marketingOptIn, childDataOptIn }: ConsentPreferencesProps) {
  const [marketing, setMarketing] = useState(marketingOptIn);
  const [childData, setChildData] = useState(childDataOptIn);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function toggleMarketing() {
    setLoading(true);
    setError("");
    setMessage("");
    const next = !marketing;
    const result = await updateMarketingConsent(next);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setMarketing(next);
    setMessage(next ? "Marketing emails enabled." : "Marketing emails turned off.");
  }

  async function withdrawChildData() {
    if (
      !window.confirm(
        "Withdraw child data consent? Your children's learning profiles will remain stored until you export or delete your account, but you should not add new learners without renewing consent.",
      )
    ) {
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    const result = await withdrawChildDataConsent();
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setChildData(false);
    setMessage("Child data consent withdrawn. Contact support if you need help exporting data.");
  }

  return (
    <div className={styles.consentPanel}>
      {error && <Alert variant="error">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <div className={styles.consentRow}>
        <div>
          <strong>Marketing emails</strong>
          <p className={styles.meta}>{CONSENT_COPY.marketing.hint}</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          disabled={loading}
          onClick={() => void toggleMarketing()}
        >
          {marketing ? "Opt out" : "Opt in"}
        </Button>
      </div>

      <div className={styles.consentRow}>
        <div>
          <strong>Child learning data</strong>
          <p className={styles.meta}>
            Status: {childData ? "Consent recorded" : "Withdrawn or not yet given"} (policy v
            {CONSENT_VERSION})
          </p>
          <p className={styles.meta}>{CONSENT_COPY.childData.body}</p>
        </div>
        {childData && (
          <Button
            variant="ghost"
            size="sm"
            disabled={loading}
            onClick={() => void withdrawChildData()}
          >
            Withdraw consent
          </Button>
        )}
      </div>
    </div>
  );
}
