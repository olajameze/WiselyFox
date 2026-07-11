"use client";

import { useEffect, useState } from "react";
import {
  applyTheme,
  readStoredTheme,
  resolveTheme,
  type ThemeMode,
  THEME_STORAGE_KEY,
} from "@/shared/lib/theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    const stored = readStoredTheme();
    setMode(stored);
    applyTheme(stored);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const current = readStoredTheme();
      if (current === "system") applyTheme("system");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onThemeChange = (event: Event) => {
      const detail = (event as CustomEvent<ThemeMode>).detail;
      if (detail) setMode(detail);
    };
    window.addEventListener("wiselyfox-theme-change", onThemeChange);
    return () => window.removeEventListener("wiselyfox-theme-change", onThemeChange);
  }, []);

  return <>{children}</>;
}

export function setThemeMode(mode: ThemeMode) {
  localStorage.setItem(THEME_STORAGE_KEY, mode);
  applyTheme(mode);
  window.dispatchEvent(new CustomEvent("wiselyfox-theme-change", { detail: mode }));
}

export function getThemeMode(): ThemeMode {
  return readStoredTheme();
}

export function getResolvedTheme(): "light" | "dark" {
  return resolveTheme(readStoredTheme());
}
