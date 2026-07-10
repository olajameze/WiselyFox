"use client";

import { LandingHero } from "./LandingHero";
import { LandingSections } from "./LandingSections";
import styles from "../styles/marketing.module.css";

export function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.landingInner}>
        <LandingHero />
        <LandingSections />
      </div>
    </div>
  );
}
