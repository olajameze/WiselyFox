"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { triggerInsightsExport } from "@/features/admin/actions/admin.actions";
import styles from "./admin.module.css";

export function ExportInsightsButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleExport() {
    setLoading(true);
    setMessage("");
    const result = await triggerInsightsExport();
    setLoading(false);
    if (result.success) {
      setMessage(`Export job ${result.data.jobId} completed.`);
      router.refresh();
    } else {
      setMessage(result.error);
    }
  }

  return (
    <div>
      <Button onClick={handleExport} loading={loading} size="sm">
        Run export job
      </Button>
      {message && <p className={styles.exportMessage}>{message}</p>}
    </div>
  );
}
