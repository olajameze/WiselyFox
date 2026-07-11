import { QuestStickerBadge } from "@/features/gamification/ui/QuestStickerBadge";
import styles from "@/features/parent/ui/parent.module.css";

type Sticker = {
  id: string;
  emoji: string;
  label: string;
  bgColor: string;
  questTitle: string;
  earnedAt: Date;
};

export function StickerCollection({ stickers }: { stickers: Sticker[] }) {
  if (stickers.length === 0) {
    return (
      <p className={styles.meta}>
        Complete weekly quests to collect stickers. Each quest gives you a unique badge.
      </p>
    );
  }

  return (
    <div className={styles.stickerGrid}>
      {stickers.map((s) => (
        <QuestStickerBadge
          key={s.id}
          emoji={s.emoji}
          label={s.label}
          bgColor={s.bgColor}
          questTitle={s.questTitle}
          earnedAt={s.earnedAt}
        />
      ))}
    </div>
  );
}
