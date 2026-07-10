import Link from "next/link";
import { requireParentOwner } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { Card, Badge } from "@/shared/ui";
import { RewardApprovalActions } from "@/features/parent/ui/RewardApprovalActions";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ParentRewardsPage() {
  const user = await requireParentOwner();
  const parent = await prisma.parentProfile.findUnique({
    where: { userId: user.id },
    include: {
      children: {
        include: {
          rewards: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  });

  const pending = parent?.children.flatMap((c) =>
    c.rewards
      .filter((r) => !r.approved)
      .map((r) => ({ ...r, childName: c.displayName })),
  ) ?? [];

  const approved = parent?.children.flatMap((c) =>
    c.rewards
      .filter((r) => r.approved && !r.claimed)
      .map((r) => ({ ...r, childName: c.displayName })),
  ) ?? [];

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Rewards</h1>
        <p className={styles.pageSubtitle}>
          Approve rewards your children earn through learning milestones and perfect quizzes.
        </p>
      </header>

      <Card header={<h2>Waiting for approval ({pending.length})</h2>}>
        {pending.length === 0 ? (
          <p className={styles.meta}>No pending rewards. Complete lessons to earn milestones.</p>
        ) : (
          pending.map((r) => (
            <div key={r.id} className={styles.rewardItem}>
              <div>
                <strong>{r.childName}</strong>, {r.title}
                {r.description && <p className={styles.meta}>{r.description}</p>}
              </div>
              <RewardApprovalActions rewardId={r.id} />
            </div>
          ))
        )}
      </Card>

      <Card header={<h2>Approved rewards</h2>} className={styles.mtLg}>
        {approved.length === 0 ? (
          <p className={styles.meta}>Approved rewards will appear here for your child to enjoy.</p>
        ) : (
          approved.map((r) => (
            <div key={r.id} className={styles.rewardItem}>
              <span>
                <strong>{r.childName}</strong>, {r.title}
              </span>
              <Badge variant="success">Approved</Badge>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
