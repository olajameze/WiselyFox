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
      const blob = new Blob([result.data.jsonPayload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wiselyfox-b2b-insights-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);

      setMessage(`Export job ${result.data.jobId} completed & downloaded.`);
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
