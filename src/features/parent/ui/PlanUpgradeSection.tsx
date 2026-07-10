"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Alert } from "@/shared/ui";
import {
  upgradeToFamilyPlan,
  downgradeToEssentialPlan,
} from "@/features/parent/actions/household.actions";
import styles from "./parent.module.css";

export function PlanUpgradeSection({
  plan,
  childCount,
}: {
  plan: string;
  childCount: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<"up" | "down" | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpgrade() {
    setLoading("up");
    setError("");
    setMessage("");
    const result = await upgradeToFamilyPlan();
    setLoading(null);
    if (result.success) {
      setMessage("Upgraded to Family plan. You can add up to 5 children.");
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  async function handleDowngrade() {
    setLoading("down");
    setError("");
    setMessage("");
    const result = await downgradeToEssentialPlan();
    setLoading(null);
    if (result.success) {
      setMessage("Switched to Essential plan (1 child).");
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <div>
      <p className={styles.meta}>
        Pilot mode: plan changes apply instantly with no billing. Current plan:{" "}
        <strong>{plan}</strong> ({childCount} child{childCount === 1 ? "" : "ren"}).
      </p>
      {error && <Alert variant="error">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <div className={styles.fieldRow}>
        {plan !== "FAMILY" && (
          <Button size="sm" loading={loading === "up"} onClick={handleUpgrade}>
            Upgrade to Family
          </Button>
        )}
        {plan === "FAMILY" && (
          <Button
            size="sm"
            variant="secondary"
            loading={loading === "down"}
            onClick={handleDowngrade}
          >
            Switch to Essential
          </Button>
        )}
      </div>
    </div>
  );
}
