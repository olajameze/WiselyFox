"use client";

import { useState } from "react";
import { Button, Alert } from "@/shared/ui";
import { exportHouseholdData } from "@/features/parent/actions/household.actions";
import styles from "./parent.module.css";

export function DataExportButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleExport() {
    setLoading(true);
    setError("");
    const result = await exportHouseholdData();
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    const blob = new Blob([result.data.json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wiselyfox-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <Button variant="secondary" size="sm" loading={loading} onClick={handleExport}>
        Download my data (JSON)
      </Button>
      {error && <p className={styles.meta}>{error}</p>}
    </div>
  );
}
