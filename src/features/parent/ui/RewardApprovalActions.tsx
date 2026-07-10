"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { approveReward, rejectReward } from "@/features/parent/actions/household.actions";
import styles from "./parent.module.css";

export function RewardApprovalActions({ rewardId }: { rewardId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  async function handle(action: "approve" | "reject") {
    setLoading(action);
    if (action === "approve") await approveReward(rewardId);
    else await rejectReward(rewardId);
    setLoading(null);
    router.refresh();
  }

  return (
    <div className={styles.childActions}>
      <Button
        size="sm"
        loading={loading === "approve"}
        onClick={() => handle("approve")}
      >
        Approve
      </Button>
      <Button
        size="sm"
        variant="ghost"
        loading={loading === "reject"}
        onClick={() => handle("reject")}
      >
        Decline
      </Button>
    </div>
  );
}
