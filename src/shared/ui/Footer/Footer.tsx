import Link from "next/link";
import styles from "./Footer.module.css";

interface FooterProps {
  variant?: "default" | "notebook";
}

export function Footer({ variant = "default" }: FooterProps) {
  const isNotebook = variant === "notebook";

  return (
    <footer
      className={[styles.duoFooter, isNotebook ? styles.footerNotebook : ""].filter(Boolean).join(" ")}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className={styles.footerContainer}>
        {/* Multi-Column Grid */}
        <div className={styles.footerColumnsGrid}>
          {/* Col 1: Brand & Mission */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLogoLink}>
              <span className={styles.brandEmoji} aria-hidden="true">
                🦊
              </span>
              <span className={styles.brandName}>WiselyFox</span>
            </Link>
            <p className={styles.brandTagline}>
              Child-safe, parent-guided adaptive learning for every mind. Subjects, study skills,
              and future-ready coding in one calm, inclusive notebook.
            </p>
          </div>

          {/* Col 2: Learning Tracks */}
          <div className={styles.linksCol}>
            <h4 className={styles.colHeading}>Learning Tracks</h4>
            <div className={styles.linksList}>
              <Link href="/#features">Mathematics</Link>
              <Link href="/#features">Coding &amp; STEM</Link>
              <Link href="/#features">Reading &amp; Literacy</Link>
              <Link href="/#features">Logic &amp; Reasoning</Link>
              <Link href="/#features">Study Skills</Link>
            </div>
          </div>

          {/* Col 3: Features & Accommodations */}
          <div className={styles.linksCol}>
            <h4 className={styles.colHeading}>Features &amp; Safety</h4>
            <div className={styles.linksList}>
              <Link href="/#inclusive">Inclusive Calm Mode</Link>
              <Link href="/#inclusive">Visual Schedules</Link>
              <Link href="/tutors">Verified Tutors</Link>
              <Link href="/#pricing">Pricing Plans</Link>
              <Link href="/#faq">Frequently Asked</Link>
            </div>
          </div>

          {/* Col 4: Account & Legal */}
          <div className={styles.linksCol}>
            <h4 className={styles.colHeading}>Account &amp; Legal</h4>
            <div className={styles.linksList}>
              <Link href="/sign-in">Parent Sign In</Link>
              <Link href="/child-sign-in">Child PIN Sign In</Link>
              <Link href="/tutor/sign-in">Tutor Sign In</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/support">Support &amp; GDPR</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Language & Copyright */}
        <div className={styles.footerBottomBar}>
          <div className={styles.footerLangPill} title="Site Language">
            <span aria-hidden="true">🇬🇧</span>
            <span>English (UK)</span>
          </div>
          <div className={styles.footerLegalNotice}>
            © {new Date().getFullYear()} WiselyFox. Built with care for families and learners worldwide.
          </div>
        </div>
      </div>
    </footer>
  );
}
