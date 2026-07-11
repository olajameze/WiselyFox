"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { claimReward } from "@/features/learning/actions/learning.actions";
import styles from "@/features/parent/ui/parent.module.css";

export function RewardClaimButton({ rewardId }: { rewardId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClaim() {
    setLoading(true);
    setError(null);
    const result = await claimReward(rewardId);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div className={styles.claimActions}>
      <Button size="sm" loading={loading} onClick={handleClaim}>
        Claim reward
      </Button>
      {error && <p className={styles.meta}>{error}</p>}
    </div>
  );
}
