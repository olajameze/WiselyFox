import { STICKER_COLORS } from "@/features/gamification/services/sticker-generator.service";
import stickerStyles from "@/features/gamification/ui/quest-sticker.module.css";

const COLOR_CLASSES = [
  stickerStyles.stickerColor0,
  stickerStyles.stickerColor1,
  stickerStyles.stickerColor2,
  stickerStyles.stickerColor3,
  stickerStyles.stickerColor4,
  stickerStyles.stickerColor5,
  stickerStyles.stickerColor6,
  stickerStyles.stickerColor7,
  stickerStyles.stickerColor8,
  stickerStyles.stickerColor9,
] as const;

export function getStickerColorClass(bgColor: string): string {
  const index = STICKER_COLORS.findIndex(
    (color) => color.toLowerCase() === bgColor.toLowerCase(),
  );
  return COLOR_CLASSES[index >= 0 ? index : 0];
}
