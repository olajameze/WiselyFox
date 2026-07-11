import { describe, it, expect } from "vitest";
import { getStickerColorClass } from "@/features/gamification/lib/sticker-color";
import stickerStyles from "@/features/gamification/ui/quest-sticker.module.css";

describe("getStickerColorClass", () => {
  it("maps known sticker colors to CSS module classes", () => {
    expect(getStickerColorClass("#E8F4EA")).toBe(stickerStyles.stickerColor0);
    expect(getStickerColorClass("#FFEBEE")).toBe(stickerStyles.stickerColor9);
  });

  it("falls back to first color for unknown values", () => {
    expect(getStickerColorClass("#000000")).toBe(stickerStyles.stickerColor0);
  });
});
