"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { reviewFraudSignal } from "@/features/admin/actions/admin.actions";
import styles from "./admin.module.css";

export function FraudReviewActions({ signalId }: { signalId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"clear" | "block" | null>(null);

  async function handle(decision: "clear" | "block") {
    setLoading(decision);
    await reviewFraudSignal(signalId, decision);
    setLoading(null);
    router.refresh();
  }

  return (
    <div className={styles.rowActions}>
      <Button
        size="sm"
        variant="secondary"
        loading={loading === "clear"}
        onClick={() => handle("clear")}
      >
        Clear
      </Button>
      <Button
        size="sm"
        variant="danger"
        loading={loading === "block"}
        onClick={() => handle("block")}
      >
        Block
      </Button>
    </div>
  );
}
