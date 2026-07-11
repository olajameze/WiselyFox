import { getStickerColorClass } from "@/features/gamification/lib/sticker-color";
import styles from "@/features/gamification/ui/quest-sticker.module.css";

type Props = {
  emoji: string;
  label: string;
  bgColor: string;
  questTitle?: string;
  earnedAt?: Date;
  size?: "sm" | "md" | "lg";
};

export function QuestStickerBadge({
  emoji,
  label,
  bgColor,
  questTitle,
  earnedAt,
  size = "md",
}: Props) {
  const colorClass = getStickerColorClass(bgColor);

  return (
    <div
      className={[
        styles.stickerBadge,
        colorClass,
        size === "sm" ? styles.stickerBadgeSm : size === "lg" ? styles.stickerBadgeLg : "",
      ]
        .filter(Boolean)
        .join(" ")}
      title={questTitle ? `${questTitle}: ${label}` : label}
      aria-label={questTitle ? `${questTitle} sticker: ${label}` : `Sticker: ${label}`}
    >
      <span className={styles.stickerEmoji} aria-hidden="true">
        {emoji}
      </span>
      <span className={styles.stickerLabel}>{label}</span>
      {earnedAt && (
        <span className={styles.stickerDate}>{earnedAt.toLocaleDateString("en-GB")}</span>
      )}
    </div>
  );
}
