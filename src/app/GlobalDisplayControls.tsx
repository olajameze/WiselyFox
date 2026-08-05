"use client";

import { PreferenceIconGroup } from "@/shared/ui/PreferenceIconGroup/PreferenceIconGroup";
import styles from "./GlobalDisplayControls.module.css";

/**
 * Floating display controls (theme + accessibility) shown on every page.
 * Mounted once in the root layout so both public and dashboard pages
 * have a consistent way to adjust light/dark mode and accessibility.
 */
export function GlobalDisplayControls() {
  return (
    <div className={styles.fab} role="group" aria-label="Display preferences">
      <PreferenceIconGroup hint="Adjust display for easier reading. These settings apply to this device only." />
    </div>
  );
}
