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
      <div
        style={{
          background: "linear-gradient(135deg, #e05638 0%, #f97316 100%)",
          borderRadius: "20px",
          padding: "1.75rem",
          color: "#ffffff",
          boxShadow: "0 6px 0 #b43e2b, 0 12px 24px rgba(224, 86, 56, 0.25)",
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              fontSize: "3.25rem",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: "72px",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            🦊
          </div>
          <div>
            <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800 }}>
              The Fox Den Rewards
            </h1>
            <p style={{ margin: "0.25rem 0 0", opacity: 0.9, fontSize: "0.9rem" }}>
              Level up your daily study streak, collect quest stickers, and earn badges!
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ background: "rgba(0,0,0,0.25)", padding: "0.6rem 1rem", borderRadius: "14px", textAlign: "center", minWidth: "80px" }}>
            <span style={{ fontSize: "1.25rem", display: "block", fontWeight: 800 }}>🔥 {dashboard.streakDays}</span>
            <span style={{ fontSize: "0.725rem", textTransform: "uppercase", opacity: 0.9, fontWeight: 700 }}>Streak</span>
          </div>
          <div style={{ background: "rgba(0,0,0,0.25)", padding: "0.6rem 1rem", borderRadius: "14px", textAlign: "center", minWidth: "80px" }}>
            <span style={{ fontSize: "1.25rem", display: "block", fontWeight: 800 }}>⚡ {xp}</span>
            <span style={{ fontSize: "0.725rem", textTransform: "uppercase", opacity: 0.9, fontWeight: 700 }}>Total XP</span>
          </div>
          <div style={{ background: "rgba(0,0,0,0.25)", padding: "0.6rem 1rem", borderRadius: "14px", textAlign: "center", minWidth: "80px" }}>
            <span style={{ fontSize: "1.25rem", display: "block", fontWeight: 800 }}>🪙 {profile?.coins ?? 0}</span>
            <span style={{ fontSize: "0.725rem", textTransform: "uppercase", opacity: 0.9, fontWeight: 700 }}>Coins</span>
          </div>
          <div style={{ background: "rgba(0,0,0,0.25)", padding: "0.6rem 1rem", borderRadius: "14px", textAlign: "center", minWidth: "80px" }}>
            <span style={{ fontSize: "1.25rem", display: "block", fontWeight: 800 }}>🌟 {dashboard.stickers.length}</span>
            <span style={{ fontSize: "0.725rem", textTransform: "uppercase", opacity: 0.9, fontWeight: 700 }}>Stickers</span>
          </div>
        </div>
      </div>

      <Card>
        {dashboard.nextStreakReward && (
          <div className={styles.mtLg}>
            <ProgressBar
              value={Math.min(
                100,
                Math.round((dashboard.streakDays / dashboard.nextStreakReward.days) * 100),
              )}
              label={`Next streak reward: ${dashboard.nextStreakReward.title} (${dashboard.nextStreakReward.days} days)`}
            />
            <p className={styles.meta}>{dashboard.nextStreakReward.description}</p>
          </div>
        )}
        {dashboard.nextMilestone && (
          <div className={styles.mtLg}>
            <ProgressBar
              value={progressToNext}
              label={`Next XP reward: ${dashboard.nextMilestone.title} (${dashboard.nextMilestoneXp} XP)`}
            />
            <p className={styles.meta}>{dashboard.nextMilestone.description}</p>
          </div>
        )}
      </Card>

      <Card header={<h2>Daily streak rewards</h2>} className={styles.cardSpaced}>
        <Alert variant="info" title="Study every day">
          Complete a lesson, quiz, or focus session once per day to grow your streak. Miss a day and
          it resets to 1.
        </Alert>
        <div className={styles.milestoneList}>
          {dashboard.streakMilestones.map((m) => {
            const earned = dashboard.streakDays >= m.days;
            return (
              <div key={m.days} className={styles.milestoneItem}>
                <div>
                  <strong>{m.title}</strong>
                  <p className={styles.meta}>{m.description}</p>
                </div>
                <Badge variant={earned ? "success" : undefined}>{m.days} days</Badge>
              </div>
            );
          })}
        </div>
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
                {r.description && <span className={styles.meta}>: {r.description}</span>}
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
