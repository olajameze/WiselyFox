"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/Button/Button";
import { WritingText } from "./WritingText";
import { FoxHeroAnimation } from "./FoxHeroAnimation";
import styles from "../styles/marketing.module.css";

const EYEBROW = "Child safe, parent guided, adaptive";
const TITLE = "Learning that understands every mind";
const SUBTITLE =
  "WiselyFox teaches subjects, study skills, and future-ready skills, with calm design, parent visibility, and inclusive support built in from day one.";

/** Keep hero typing under ~1s so CTAs feel ready quickly. */
const EYEBROW_DELAY = 40;
const EYEBROW_SPEED = 12;
const TITLE_DELAY = 120;
const TITLE_SPEED = 14;
const SUBTITLE_DELAY = 280;
const SUBTITLE_SPEED = 6;

const SUBJECT_PILLS = [
  { icon: "🔢", label: "Maths" },
  { icon: "💻", label: "Coding" },
  { icon: "📖", label: "Reading" },
  { icon: "🚀", label: "STEM & AI" },
  { icon: "🧠", label: "Logic" },
  { icon: "✨", label: "Study Skills" },
];

export function LandingHero() {
  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.duoHeroGrid}>
        {/* Left: Playful Animated Mascot Vignette */}
        <div className={styles.heroMascotCol}>
          <FoxHeroAnimation />
        </div>

        {/* Right: Open Learning Journal Page */}
        <div className={styles.heroContentCol}>
          <div className={styles.notebookOpen}>
            <div className={styles.bookSpine} aria-hidden="true" />
            <div className={styles.notebookPage}>
              <div className={styles.pageMeta}>
                <span>p. 1</span>
                <span>WiselyFox learning journal</span>
              </div>

              <span className={styles.eyebrowWrap}>
                <svg viewBox="0 0 320 32" aria-hidden="true">
                  <path d="M12 18 C 48 2, 96 2, 124 18 S 208 30, 266 14 S 296 8, 308 14" />
                </svg>
                <WritingText
                  text={EYEBROW}
                  as="span"
                  className={styles.eyebrow}
                  delay={EYEBROW_DELAY}
                  speed={EYEBROW_SPEED}
                />
              </span>
              <WritingText
                text={TITLE}
                as="h1"
                className={styles.title}
                delay={TITLE_DELAY}
                speed={TITLE_SPEED}
              />
              <WritingText
                text={SUBTITLE}
                as="p"
                className={styles.subtitle}
                delay={SUBTITLE_DELAY}
                speed={SUBTITLE_SPEED}
              />

              {/* 3D Tactile CTA Action Buttons */}
              <div className={styles.ctas}>
                <Link href="/sign-up" className={styles.ctaPrimaryLink}>
                  <Button size="lg" className={styles.btn3dPrimary}>
                    GET STARTED FREE
                  </Button>
                </Link>
                <Link href="/sign-in" className={styles.ctaSecondaryLink}>
                  <Button variant="secondary" size="lg" className={styles.btn3dSecondary}>
                    I ALREADY HAVE AN ACCOUNT
                  </Button>
                </Link>
                <Link href="#waitlist" className={styles.ctaWaitlistLink}>
                  <Button variant="ghost" size="lg">
                    Join waiting list →
                  </Button>
                </Link>
              </div>

              {/* Playful Subject Track Pills Strip */}
              <div className={styles.heroPillsStrip} aria-label="Available learning tracks">
                {SUBJECT_PILLS.map((pill) => (
                  <span key={pill.label} className={styles.heroTrackPill}>
                    <span aria-hidden="true">{pill.icon}</span> {pill.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
