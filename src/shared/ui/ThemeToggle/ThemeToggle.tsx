"use client";

import { useEffect, useState } from "react";
import {
  getResolvedTheme,
  getThemeMode,
  setThemeMode,
} from "@/shared/ui/ThemeProvider/ThemeProvider";
import type { ThemeMode } from "@/shared/lib/theme";
import styles from "./ThemeToggle.module.css";

const CYCLE: ThemeMode[] = ["light", "dark", "system"];

function nextMode(current: ThemeMode): ThemeMode {
  const index = CYCLE.indexOf(current);
  return CYCLE[(index + 1) % CYCLE.length];
}

function labelFor(mode: ThemeMode, resolved: "light" | "dark") {
  if (mode === "system") return `System theme (${resolved})`;
  return mode === "dark" ? "Dark theme" : "Light theme";
}

function iconFor(mode: ThemeMode, resolved: "light" | "dark") {
  if (mode === "system") return "💻";
  return resolved === "dark" ? "🌙" : "☀️";
}

type Props = {
  /** @deprecated compact is always on; prop kept for call-site compatibility */
  compact?: boolean;
};

export function ThemeToggle({ compact: _compact = true }: Props) {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMode(getThemeMode());
    setResolved(getResolvedTheme());

    const onThemeChange = () => {
      setMode(getThemeMode());
      setResolved(getResolvedTheme());
    };
    window.addEventListener("wiselyfox-theme-change", onThemeChange);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", onThemeChange);
    return () => {
      window.removeEventListener("wiselyfox-theme-change", onThemeChange);
      media.removeEventListener("change", onThemeChange);
    };
  }, []);

  function handleClick() {
    const next = nextMode(mode);
    setThemeMode(next);
    setMode(next);
    setResolved(getResolvedTheme());
  }

  const icon = iconFor(mode, resolved);
  const label = labelFor(mode, resolved);

  return (
    <button
      type="button"
      className={[styles.toggle, styles.toggleCompact].join(" ")}
      onClick={handleClick}
      aria-label={`${label}. Click to change.`}
      title={label}
    >
      <span className={styles.toggleIcon} aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
