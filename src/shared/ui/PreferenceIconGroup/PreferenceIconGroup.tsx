"use client";

import { ThemeToggle } from "@/shared/ui/ThemeToggle/ThemeToggle";
import { AccessibilityToolbar } from "@/shared/ui/AccessibilityToolbar/AccessibilityToolbar";
import styles from "./PreferenceIconGroup.module.css";

type Props = {
  hint?: string;
  className?: string;
  variant?: "default" | "notebook";
};

export function PreferenceIconGroup({
  hint = "Adjust display for easier reading. These settings apply to this device only.",
  className,
  variant = "default",
}: Props) {
  return (
    <div
      className={[
        styles.group,
        variant === "notebook" ? styles.notebookGroup : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="group"
      aria-label="Display preferences"
    >
      <ThemeToggle compact />
      <AccessibilityToolbar hint={hint} />
    </div>
  );
}
