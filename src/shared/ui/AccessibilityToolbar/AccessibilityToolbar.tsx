"use client";

import { useEffect, useState } from "react";
import styles from "./AccessibilityToolbar.module.css";

export type DashboardA11yPrefs = {
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  dyslexiaFriendly: boolean;
  calmColors: boolean;
};

const STORAGE_KEY = "wiselyfox-dashboard-a11y";
const LEGACY_KEY = "wiselyfox-parent-a11y";

const DEFAULT_PREFS: DashboardA11yPrefs = {
  largeText: false,
  highContrast: false,
  reducedMotion: false,
  dyslexiaFriendly: false,
  calmColors: false,
};

function readPrefs(): DashboardA11yPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<DashboardA11yPrefs>;
    return { ...DEFAULT_PREFS, ...parsed };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function applyDashboardA11yPrefs(prefs: DashboardA11yPrefs) {
  const root = document.documentElement;
  root.dataset.dashboardLargeText = prefs.largeText ? "true" : "false";
  root.dataset.dashboardHighContrast = prefs.highContrast ? "true" : "false";
  root.dataset.dashboardReducedMotion = prefs.reducedMotion ? "true" : "false";
  root.dataset.dashboardDyslexia = prefs.dyslexiaFriendly ? "true" : "false";
  root.dataset.dashboardCalm = prefs.calmColors ? "true" : "false";
  root.dataset.parentReducedMotion = prefs.reducedMotion ? "true" : "false";
}

type Props = {
  hint?: string;
};

export function AccessibilityToolbar({
  hint = "Adjust display for easier reading. These settings apply to this device only.",
}: Props) {
  const [prefs, setPrefs] = useState<DashboardA11yPrefs>(() => readPrefs());

  useEffect(() => {
    applyDashboardA11yPrefs(prefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  function toggle(key: keyof DashboardA11yPrefs) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function enableCalmMode() {
    setPrefs((prev) => ({
      ...prev,
      calmColors: true,
      reducedMotion: true,
    }));
  }

  function enableReadingSupport() {
    setPrefs((prev) => ({
      ...prev,
      dyslexiaFriendly: true,
      largeText: true,
    }));
  }

  return (
    <details className={styles.wrap}>
      <summary className={styles.iconBtn} aria-label="Accessibility options" title="Accessibility">
        <span className={styles.icon} aria-hidden="true">
          ♿
        </span>
      </summary>
      <div className={styles.panel} aria-label="Accessibility options">
        <p className={styles.hint}>{hint}</p>
        <div className={styles.presetRow}>
          <button type="button" className={styles.presetBtn} onClick={enableCalmMode}>
            Calm mode
          </button>
          <button type="button" className={styles.presetBtn} onClick={enableReadingSupport}>
            Reading support
          </button>
        </div>
        <label className={styles.option}>
          <input type="checkbox" checked={prefs.largeText} onChange={() => toggle("largeText")} />
          <span>
            Larger text
            <span className={styles.optionHelp}>Increases font size across the app.</span>
          </span>
        </label>
        <label className={styles.option}>
          <input type="checkbox" checked={prefs.highContrast} onChange={() => toggle("highContrast")} />
          <span>
            High contrast
            <span className={styles.optionHelp}>Stronger text and border contrast.</span>
          </span>
        </label>
        <label className={styles.option}>
          <input
            type="checkbox"
            checked={prefs.dyslexiaFriendly}
            onChange={() => toggle("dyslexiaFriendly")}
          />
          <span>
            Dyslexia-friendly text
            <span className={styles.optionHelp}>Open spacing and a clearer reading font.</span>
          </span>
        </label>
        <label className={styles.option}>
          <input type="checkbox" checked={prefs.calmColors} onChange={() => toggle("calmColors")} />
          <span>
            Calm colours
            <span className={styles.optionHelp}>Softer palette for sensory comfort.</span>
          </span>
        </label>
        <label className={styles.option}>
          <input type="checkbox" checked={prefs.reducedMotion} onChange={() => toggle("reducedMotion")} />
          <span>
            Reduced motion
            <span className={styles.optionHelp}>Turns off animations and page transitions.</span>
          </span>
        </label>
      </div>
    </details>
  );
}

// Back-compat export
export { AccessibilityToolbar as DashboardAccessibilityToolbar };
