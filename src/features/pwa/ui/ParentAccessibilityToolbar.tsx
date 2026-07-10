"use client";

import { useEffect, useState } from "react";
import styles from "./accessibility-toolbar.module.css";

type Prefs = {
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
};

const STORAGE_KEY = "wiselyfox-parent-a11y";

function readPrefs(): Prefs {
  if (typeof window === "undefined") {
    return { largeText: false, highContrast: false, reducedMotion: false };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { largeText: false, highContrast: false, reducedMotion: false };
    return JSON.parse(raw) as Prefs;
  } catch {
    return { largeText: false, highContrast: false, reducedMotion: false };
  }
}

function applyPrefs(prefs: Prefs) {
  const root = document.documentElement;
  root.dataset.parentLargeText = prefs.largeText ? "true" : "false";
  root.dataset.parentHighContrast = prefs.highContrast ? "true" : "false";
  root.dataset.parentReducedMotion = prefs.reducedMotion ? "true" : "false";
}

export function ParentAccessibilityToolbar() {
  const [prefs, setPrefs] = useState<Prefs>(() => readPrefs());

  useEffect(() => {
    applyPrefs(prefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  function toggle(key: keyof Prefs) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <details className={styles.toolbarWrap}>
      <summary className={styles.toolbarToggle}>Accessibility</summary>
      <div className={styles.panel} aria-label="Accessibility options">
        <p className={styles.panelHint}>Adjust display for easier reading on phone, tablet, or desktop.</p>
        <label className={styles.option}>
          <input type="checkbox" checked={prefs.largeText} onChange={() => toggle("largeText")} />
          Larger text
        </label>
        <label className={styles.option}>
          <input type="checkbox" checked={prefs.highContrast} onChange={() => toggle("highContrast")} />
          High contrast
        </label>
        <label className={styles.option}>
          <input type="checkbox" checked={prefs.reducedMotion} onChange={() => toggle("reducedMotion")} />
          Reduced motion
        </label>
      </div>
    </details>
  );
}
