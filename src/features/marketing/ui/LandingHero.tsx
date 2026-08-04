"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/Button/Button";
import { WritingText } from "./WritingText";
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

export function LandingHero() {
  return (
    <section className={styles.hero} aria-label="Introduction">
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

          <div className={styles.ctas}>
            <Link href="/sign-up">
              <Button size="lg">Join family pilot</Button>
            </Link>
            <Link href="#waitlist">
              <Button variant="ghost" size="lg">
                Join waiting list
              </Button>
            </Link>
          </div>

          <span className={styles.penDecor} aria-hidden="true">
            ✏️
          </span>
        </div>
      </div>
    </section>
  );
}
