import Link from "next/link";
import { redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import { getChildRewardsDashboard } from "@/features/gamification/services/child-rewards.service";
import { RewardClaimButton } from "@/features/learning/ui/RewardClaimButton";
import { WeeklyQuestPanel } from "@/features/gamification/ui/WeeklyQuestPanel";
import { StickerCollection } from "@/features/gamification/ui/StickerCollection";
import { Card, Button, Badge, ProgressBar, Alert } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function LearnRewardsPage() {
  const user = await requireChild();
  const child = await getLearnChildByUserId(user.id);
  if (!child?.learningProfile) redirect("/child-sign-in");

  const dashboard = await getChildRewardsDashboard(child.id);
  const profile = dashboard.profile;
  const xp = profile?.xp ?? 0;
  const progressToNext = dashboard.nextMilestoneXp
    ? Math.min(100, Math.round((xp / dashboard.nextMilestoneXp) * 100))
    : 100;

  return (
    <>
      <header className={styles.pageHeader}>
        <h1>Your rewards</h1>
        <p className={styles.pageSubtitle}>
          Finish weekly quests to collect stickers. Earn XP from lessons, quizzes, and focus time.
        </p>
      </header>

      <Card>
        <div className={styles.statsGrid}>
          <div>
            <strong>{xp} XP</strong>
            <p className={styles.meta}>Total experience</p>
          </div>
          <div>
            <strong>{profile?.coins ?? 0}</strong>
            <p className={styles.meta}>Coins</p>
          </div>
          <div>
            <strong>{profile?.streakDays ?? 0} days</strong>
            <p className={styles.meta}>Study streak</p>
          </div>
          <div>
            <strong>{dashboard.stickers.length}</strong>
            <p className={styles.meta}>Stickers collected</p>
          </div>
        </div>
        {dashboard.nextMilestone && (
          <div className={styles.mtLg}>
            <ProgressBar
              value={progressToNext}
              label={`Next parent reward: ${dashboard.nextMilestone.title} (${dashboard.nextMilestoneXp} XP)`}
            />
            <p className={styles.meta}>{dashboard.nextMilestone.description}</p>
          </div>
        )}
      </Card>

      <Card header={<h2>Weekly quests</h2>} className={styles.cardSpaced}>
        <WeeklyQuestPanel
          quests={dashboard.quests}
          questsCompleted={dashboard.questsCompleted}
          questsTotal={dashboard.questsTotal}
        />
      </Card>

      <Card header={<h2>Sticker collection</h2>} className={styles.cardSpaced}>
        <StickerCollection stickers={dashboard.stickers} />
      </Card>

      {dashboard.readyToClaim.length > 0 && (
        <Card header={<h2>Ready to claim ({dashboard.readyToClaim.length})</h2>} className={styles.cardSpaced}>
          {dashboard.readyToClaim.map((r) => (
            <div key={r.id} className={styles.rewardItem}>
              <div>
                <strong>{r.title}</strong>
                {r.description && <p className={styles.meta}>{r.description}</p>}
              </div>
              <RewardClaimButton rewardId={r.id} />
            </div>
          ))}
        </Card>
      )}

      {dashboard.pendingApproval.length > 0 && (
        <Card header={<h2>Waiting for parent ({dashboard.pendingApproval.length})</h2>} className={styles.cardSpaced}>
          {dashboard.pendingApproval.map((r) => (
            <Alert key={r.id} variant="info" title={r.title}>
              {r.description ?? "Your parent will approve this soon!"}
            </Alert>
          ))}
        </Card>
      )}

      <Card header={<h2>XP milestones</h2>} className={styles.cardSpaced}>
        <div className={styles.milestoneList}>
          {dashboard.milestones.map((m) => {
            const earned = xp >= m.xp;
            return (
              <div key={m.xp} className={styles.milestoneItem}>
                <div>
                  <strong>{m.title}</strong>
                  <p className={styles.meta}>{m.description}</p>
                </div>
                <Badge variant={earned ? "success" : undefined}>{m.xp} XP</Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {dashboard.claimed.length > 0 && (
        <Card header={<h2>Claimed rewards</h2>} className={styles.cardSpaced}>
          {dashboard.claimed.map((r) => (
            <div key={r.id} className={styles.rewardItem}>
              <span>
                <strong>{r.title}</strong>
                {r.description && <span className={styles.meta}> — {r.description}</span>}
              </span>
              <Badge variant="success">Claimed</Badge>
            </div>
          ))}
        </Card>
      )}

      <div className={styles.learnActionsInline}>
        <Link href="/learn">
          <Button variant="secondary" size="sm">
            Back to home
          </Button>
        </Link>
        <Link href="/learn/subjects">
          <Button size="sm">Earn more XP</Button>
        </Link>
        <Link href="/learn/certificates">
          <Button variant="ghost" size="sm">
            Certificates
          </Button>
        </Link>
      </div>
    </>
  );
}
