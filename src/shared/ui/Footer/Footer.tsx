import Link from "next/link";
import styles from "./Footer.module.css";

interface FooterProps {
  variant?: "default" | "notebook";
}

export function Footer({ variant = "default" }: FooterProps) {
  const isNotebook = variant === "notebook";

  return (
    <footer className={[styles.footer, isNotebook ? styles.footerNotebook : ""].filter(Boolean).join(" ")}>
      <div className={isNotebook ? styles.notebookWrap : "container"}>
        <div className={[styles.grid, isNotebook ? styles.gridNotebook : ""].filter(Boolean).join(" ")}>
          <div>
            <div className={[styles.brand, isNotebook ? styles.brandNotebook : ""].filter(Boolean).join(" ")}>
              {isNotebook && (
                <span className={styles.brandMark} aria-hidden="true">
                  📖
                </span>
              )}
              WiselyFox
            </div>
            <p className={[styles.tagline, isNotebook ? styles.taglineNotebook : ""].filter(Boolean).join(" ")}>
              Child safe, parent guided learning for every mind. Subjects, study skills,
              and future-ready skills in one calm adaptive experience.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={isNotebook ? styles.sectionTitleNotebook : undefined}>Product</h3>
            <div className={[styles.links, isNotebook ? styles.linksNotebook : ""].filter(Boolean).join(" ")}>
              <Link href="/#features">Features</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/sign-up">Family pilot</Link>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={isNotebook ? styles.sectionTitleNotebook : undefined}>Safety</h3>
            <div className={[styles.links, isNotebook ? styles.linksNotebook : ""].filter(Boolean).join(" ")}>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/support">Support</Link>
              <Link href="/#inclusive">Inclusive learning</Link>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={isNotebook ? styles.sectionTitleNotebook : undefined}>Account</h3>
            <div className={[styles.links, isNotebook ? styles.linksNotebook : ""].filter(Boolean).join(" ")}>
              <Link href="/sign-in">Sign in</Link>
              <Link href="/sign-up">Create account</Link>
            </div>
          </div>
        </div>
        <div className={[styles.bottom, isNotebook ? styles.bottomNotebook : ""].filter(Boolean).join(" ")}>
          © {new Date().getFullYear()} WiselyFox. Built with care for families and learners.
        </div>
      </div>
    </footer>
  );
}
