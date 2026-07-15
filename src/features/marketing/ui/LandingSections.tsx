"use client";

import { Card } from "@/shared/ui/Card/Card";
import { LiveAppSlideshow } from "./LiveAppSlideshow";
import { AppDemoPreview } from "./AppDemoPreview";
import { PricingSection } from "./PricingSection";
import { WaitlistSection } from "./WaitlistSection";
import { WritingText } from "./WritingText";
import { LANDING_FAQS } from "../lib/landing-faqs";
import styles from "../styles/marketing.module.css";

export function LandingSections() {
  return (
    <>
      <section className={`${styles.section} ${styles.notebookSection}`}>
        <WritingText
          text="See WiselyFox in action"
          as="h2"
          className={`${styles.sectionTitle} ${styles.sectionTitleLearn}`}
          startWhenVisible
          speed={22}
        />
        <WritingText
          text="A calm peek at learning, lessons, and the parent dashboard."
          as="p"
          className={styles.sectionSubtitle}
          startWhenVisible
          speed={12}
          delay={80}
        />
        <LiveAppSlideshow />
      </section>

      <section
        id="demo"
        className={`${styles.section} ${styles.notebookSection} ${styles.notebookSectionAlt}`}
      >
        <WritingText
          text="Try the experience"
          as="h2"
          className={`${styles.sectionTitle} ${styles.sectionTitleWarm}`}
          startWhenVisible
          speed={22}
        />
        <WritingText
          text="Click through real app scenarios, no account needed."
          as="p"
          className={styles.sectionSubtitle}
          startWhenVisible
          speed={12}
          delay={80}
        />
        <AppDemoPreview />
      </section>

      <section id="features" className={`${styles.section} ${styles.notebookSection}`}>
        <WritingText
          text="Built for real families"
          as="h2"
          className={`${styles.sectionTitle} ${styles.sectionTitleWarm}`}
          startWhenVisible
          speed={22}
        />
        <div className={`${styles.grid} ${styles.grid3}`}>
          <Card interactive className={styles.featureCard}>
            <div className={styles.featureIcon}>📚</div>
            <WritingText
              text="Subjects + study skills"
              as="h3"
              className={`${styles.cardTitle} ${styles.cardTitleLearn}`}
              startWhenVisible
              speed={18}
            />
            <p>
              Maths, reading, coding, money literacy, and how to learn, not just what to learn.
            </p>
          </Card>
          <Card interactive className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <WritingText
              text="Adaptive paths"
              as="h3"
              className={`${styles.cardTitle} ${styles.cardTitleLearn}`}
              startWhenVisible
              speed={18}
              delay={40}
            />
            <p>
              Entrance assessment sets the level. Lessons adapt to mastery, gaps, and pace.
            </p>
          </Card>
          <Card interactive className={styles.featureCard}>
            <div className={styles.featureIcon}>👨‍👩‍👧</div>
            <WritingText
              text="Parent control"
              as="h3"
              className={`${styles.cardTitle} ${styles.cardTitleWarm}`}
              startWhenVisible
              speed={18}
              delay={80}
            />
            <p>
              Full visibility, reward approval, schedules, and privacy settings you can trust.
            </p>
          </Card>
        </div>
      </section>

      <section
        id="inclusive"
        className={`${styles.section} ${styles.notebookSection} ${styles.notebookSectionAlt}`}
      >
        <WritingText
          text="Inclusive by design"
          as="h2"
          className={`${styles.sectionTitle} ${styles.sectionTitleCalm}`}
          startWhenVisible
          speed={22}
        />
        <WritingText
          text="Onboarding captures your child's strengths and needs, then applies tailored accessibility settings across lessons, quizzes, and focus sessions."
          as="p"
          className={styles.sectionSubtitle}
          startWhenVisible
          speed={10}
          delay={60}
        />
        <div className={styles.grid}>
          <Card className={styles.noteCard}>
            <WritingText
              text="Calm mode"
              as="h3"
              className={`${styles.cardTitle} ${styles.cardTitleCalm}`}
              startWhenVisible
              speed={18}
            />
            <p>
              Softer colours, reduced motion, and optional hidden timers in parent Settings. Gentle
              celebrations with no confetti-style effects when calm mode is on.
            </p>
          </Card>
          <Card className={styles.noteCard}>
            <WritingText
              text="Visual schedules"
              as="h3"
              className={`${styles.cardTitle} ${styles.cardTitleCalm}`}
              startWhenVisible
              speed={18}
              delay={40}
            />
            <p>
              Predictable step-by-step lesson flows for ADHD and autistic learners, plus
              parent-built daily schedules on the learn home.
            </p>
          </Card>
          <Card className={styles.noteCard}>
            <WritingText
              text="Focus sessions"
              as="h3"
              className={`${styles.cardTitle} ${styles.cardTitleCalm}`}
              startWhenVisible
              speed={18}
              delay={80}
            />
            <p>
              Short timed blocks with movement breaks every 10 minutes for ADHD profiles. Session
              length is parent-controlled.
            </p>
          </Card>
          <Card className={styles.noteCard}>
            <WritingText
              text="Readable content"
              as="h3"
              className={`${styles.cardTitle} ${styles.cardTitleCalm}`}
              startWhenVisible
              speed={18}
              delay={120}
            />
            <p>
              Dyslexia-friendly fonts and spacing, high contrast, larger text toggles, and lessons
              chunked one idea at a time.
            </p>
          </Card>
        </div>
      </section>

      <WaitlistSection />

      <section className={`${styles.section} ${styles.notebookSection}`}>
        <WritingText
          text="Trusted & safe"
          as="h2"
          className={`${styles.sectionTitle} ${styles.sectionTitleTrust}`}
          startWhenVisible
          speed={22}
        />
        <div className={styles.grid}>
          <Card className={styles.noteCard}>
            <WritingText
              text="Privacy first"
              as="h3"
              className={`${styles.cardTitle} ${styles.cardTitleTrust}`}
              startWhenVisible
              speed={18}
            />
            <p>GDPR minded. Parent consent gates. No child data sold. No third party ads.</p>
          </Card>
          <Card className={styles.noteCard}>
            <WritingText
              text="Secure by default"
              as="h3"
              className={`${styles.cardTitle} ${styles.cardTitleTrust}`}
              startWhenVisible
              speed={18}
              delay={40}
            />
            <p>
              Encrypted sessions, rate limited sign-in and PIN checks, disposable-email screening,
              and audited admin access.
            </p>
          </Card>
        </div>
      </section>

      <section className={`${styles.notebookSection} ${styles.notebookSectionAlt}`}>
        <PricingSection />
      </section>

      <section id="faq" className={`${styles.section} ${styles.notebookSection}`}>
        <WritingText
          text="Questions"
          as="h2"
          className={`${styles.sectionTitle} ${styles.sectionTitleTrust}`}
          startWhenVisible
          speed={22}
        />
        <div className={styles.faq}>
          {LANDING_FAQS.map((f, i) => (
            <div key={f.q} className={styles.faqItem}>
              <WritingText
                text={f.q}
                as="div"
                className={styles.faqQ}
                startWhenVisible
                speed={16}
                delay={i * 30}
              />
              <p className={styles.faqA}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
