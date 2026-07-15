import styles from "./auth.module.css";

export function AuthFormFallback({ title = "Loading…" }: { title?: string }) {
  return (
    <div className={styles.authPage} aria-busy="true" aria-label={title}>
      <div className={styles.notebookOpen}>
        <div className={styles.bookSpine} aria-hidden="true" />
        <div className={styles.authCard} style={{ minHeight: "18rem", width: "100%" }}>
          <div>
            <div className={styles.pageMeta}>
              <span>p. 1</span>
              <span>{title}</span>
            </div>
            <p className={styles.authSubtitle}>Just a moment…</p>
          </div>
        </div>
      </div>
    </div>
  );
}
