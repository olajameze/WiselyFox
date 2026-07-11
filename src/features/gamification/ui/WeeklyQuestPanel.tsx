import { ProgressBar, Badge } from "@/shared/ui";
import { QuestStickerBadge } from "@/features/gamification/ui/QuestStickerBadge";
import styles from "@/features/parent/ui/parent.module.css";

type QuestRow = {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
  sticker?: {
    emoji: string;
    label: string;
    bgColor: string;
    xpBonus: number;
    earnedAt: Date;
  } | null;
};

type Props = {
  quests: QuestRow[];
  questsCompleted: number;
  questsTotal: number;
  compact?: boolean;
};

export function WeeklyQuestPanel({ quests, questsCompleted, questsTotal, compact = false }: Props) {
  const overallPct =
    questsTotal > 0 ? Math.round((questsCompleted / questsTotal) * 100) : 0;

  return (
    <div className={styles.questPanel}>
      {!compact && (
        <div className={styles.questPanelHeader}>
          <div>
            <strong>Weekly quests</strong>
            <p className={styles.meta}>
              Complete quests to earn unique stickers and bonus XP.
            </p>
          </div>
          <Badge variant={questsCompleted === questsTotal && questsTotal > 0 ? "success" : undefined}>
            {questsCompleted}/{questsTotal}
          </Badge>
        </div>
      )}
      <ProgressBar value={overallPct} label={`Quest progress (${questsCompleted} of ${questsTotal})`} />
      <div className={styles.questProgressList}>
        {quests.map((q) => {
          const pct = q.target > 0 ? Math.round((q.progress / q.target) * 100) : 0;
          return (
            <div key={q.id} className={styles.questProgressItem}>
              <div className={styles.questProgressTop}>
                <div>
                  <strong>{q.title}</strong>
                  {!compact && <p className={styles.meta}>{q.description}</p>}
                </div>
                {q.completed && q.sticker ? (
                  <QuestStickerBadge
                    emoji={q.sticker.emoji}
                    label={q.sticker.label}
                    bgColor={q.sticker.bgColor}
                    size="sm"
                  />
                ) : (
                  <span className={styles.meta}>
                    {q.progress}/{q.target}
                  </span>
                )}
              </div>
              <ProgressBar value={Math.min(100, pct)} calm />
            </div>
          );
        })}
      </div>
    </div>
  );
}
