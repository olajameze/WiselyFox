import Link from "next/link";
import { redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { getLearnChildWithRewards } from "@/features/learning/services/child-session.service";
import { getAccommodationRules } from "@/features/inclusive/services/accommodation.service";
import { generateDailyObjectives } from "@/server/services/daily-objectives.service";
import { getAdaptiveRecommendations } from "@/features/learning/services/learning-path.service";
import { AGE_BAND_LABELS, isAgeBand } from "@/data/age-bands";
import { getDailyFact } from "@/data/daily-facts";
import { DailyFactCard } from "@/features/learning/ui/DailyFactCard";
import { Card, Button, ProgressBar, Badge, Alert } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function LearnHomePage() {
  const user = await requireChild();
  const child = await getLearnChildWithRewards(user.id);
  if (!child?.learningProfile) redirect("/child-sign-in");

  const profile = child.learningProfile;
  const rules = getAccommodationRules(profile);
  const calm = profile.calmColors || profile.reducedMotion;
  const ageLabel = isAgeBand(child.ageBand) ? AGE_BAND_LABELS[child.ageBand] : child.ageBand;
  const dailyFact = getDailyFact(child.id);

  const [objectives, recommendations] = await Promise.all([
    generateDailyObjectives(child.id, child.ageBand),
    getAdaptiveRecommendations(child.id, 3),
  ]);

  return (
    <>
      <p className={styles.learnMeta}>
        Your path, {ageLabel}, calm, parent guided learning (unique to WiselyFox)
      </p>

      {rules.calmMode && (
        <Alert variant="info" title="Calm mode is on">
          Softer colours, no countdown pressure, and gentle completion messages, learning without
          overwhelm.
        </Alert>
      )}

      <DailyFactCard childId={child.id} fact={dailyFact} />

      {recommendations.length > 0 && (
        <Card>
          <h2>Picked for you</h2>
          <p className={styles.learnMeta}>Adaptive path from your assessment + mastery</p>
          <div className={styles.questList}>
            {recommendations.map((rec) => (
              <div key={rec.href} className={styles.quest}>
                <div>
                  <strong>{rec.lessonTitle}</strong>
                  <div className={styles.meta}>{rec.reason}</div>
                </div>
                <Link href={rec.href}>
                  <Button size="sm">Start</Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className={styles.cardSpaced}>
        <h2>Today&apos;s missions</h2>
        <div className={styles.questList}>
          {objectives.map((obj) => (
            <div key={obj.id} className={styles.quest}>
              <span>{obj.completed ? "✓" : "○"}</span>
              <span>{obj.title}</span>
            </div>
          ))}
        </div>
      </Card>

      {child.rewards.length > 0 && (
        <Card className={styles.cardSpaced}>
          <h2>Your rewards</h2>
          {child.rewards.map((r) => (
            <Alert key={r.id} variant="success" title={r.title}>
              {r.description ?? "Approved by your parent!"}
            </Alert>
          ))}
        </Card>
      )}

      <Card className={styles.cardSpaced}>
        <ProgressBar value={profile.xp % 100} label="Level progress" calm={calm} />
        <p className={styles.learnMeta}>
          {profile.xp} XP, {profile.coins} coins
          {profile.dyslexiaFriendly && (
            <>
              {" "}
             , <Badge>Dyslexia friendly</Badge>
            </>
          )}
          {profile.highContrast && (
            <>
              {" "}
             , <Badge>High contrast</Badge>
            </>
          )}
          {profile.largeText && (
            <>
              {" "}
             , <Badge>Larger text</Badge>
            </>
          )}
          {rules.showVisualSchedule && (
            <>
              {" "}
             , <Badge>Visual schedule</Badge>
            </>
          )}
        </p>
      </Card>

      <div className={styles.learnActionsInline}>
        <Link href="/learn/subjects">
          <Button size="sm">Browse subjects</Button>
        </Link>
        <Link href="/learn/quiz">
          <Button variant="secondary" size="sm">
            Take a quiz
          </Button>
        </Link>
        {rules.showTimer && (
          <Link href="/learn/focus">
            <Button variant="ghost" size="sm">
              Focus ({profile.sessionLengthMinutes}+ min)
            </Button>
          </Link>
        )}
        <Link href="/learn/offline">
          <Button variant="ghost" size="sm">
            Offline guide
          </Button>
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
