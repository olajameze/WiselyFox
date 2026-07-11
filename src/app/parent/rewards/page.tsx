import Link from "next/link";
import { requireParentOwner } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { REWARD_MILESTONES } from "@/features/gamification/services/reward-offers.service";
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
          learningProfile: true,
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

  const claimed = parent?.children.flatMap((c) =>
    c.rewards
      .filter((r) => r.claimed)
      .map((r) => ({ ...r, childName: c.displayName })),
  ) ?? [];

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Rewards</h1>
        <p className={styles.pageSubtitle}>
          Approve rewards your children earn through learning milestones and perfect quizzes. Children
          claim approved rewards on their{" "}
          <Link href="/learn/rewards">Rewards page</Link>.
        </p>
      </header>

      <Card header={<h2>XP milestones</h2>}>
        <p className={styles.meta}>
          These unlock automatically when a child reaches the XP threshold.
        </p>
        <div className={styles.milestoneList}>
          {REWARD_MILESTONES.map((m) => (
            <div key={m.xp} className={styles.milestoneItem}>
              <div>
                <strong>{m.title}</strong>
                <p className={styles.meta}>{m.description}</p>
              </div>
              <Badge>{m.xp} XP</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card header={<h2>Waiting for approval ({pending.length})</h2>} className={styles.mtLg}>
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

      <Card header={<h2>Approved — ready to claim ({approved.length})</h2>} className={styles.mtLg}>
        {approved.length === 0 ? (
          <p className={styles.meta}>
            Approved rewards appear here until your child claims them on the learn app.
          </p>
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

      <Card header={<h2>Claimed history ({claimed.length})</h2>} className={styles.mtLg}>
        {claimed.length === 0 ? (
          <p className={styles.meta}>Claimed rewards will show here for your records.</p>
        ) : (
          claimed.map((r) => (
            <div key={r.id} className={styles.rewardItem}>
              <div>
                <strong>{r.childName}</strong>, {r.title}
                <p className={styles.meta}>Claimed {r.createdAt.toLocaleDateString("en-GB")}</p>
              </div>
              <Badge variant="success">Claimed</Badge>
            </div>
          ))
        )}
      </Card>

      {parent && parent.children.length > 0 && (
        <Card header={<h2>Children XP</h2>} className={styles.mtLg}>
          <div className={styles.statsGrid}>
            {parent.children.map((c) => (
              <div key={c.id}>
                <strong>{c.displayName}</strong>
                <p className={styles.meta}>
                  {c.learningProfile?.xp ?? 0} XP · {c.learningProfile?.streakDays ?? 0} day streak
                </p>
                <Link href={`/parent/children/${c.id}/results`}>View results</Link>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
