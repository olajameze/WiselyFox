import styles from "./IntroCard.module.css";

export function IntroCard() {
  return (
    <div className={styles.introCard}>
      <div className={styles.bookArt}>
        {/* Minimalist vector line-art of an open book */}
        <svg viewBox="0 0 200 100" className={styles.bookSvg}>
          <path d="M10 10 H95 V90 H10 Z M105 10 H190 V90 H105 Z M100 0 V100" stroke="#203354" strokeWidth="2" fill="none"/>
          <circle cx="52.5" cy="50" r="5" fill="#F26200" />
          <circle cx="147.5" cy="50" r="5" fill="#F26200" />
          <line x1="52.5" y1="50" x2="147.5" y2="50" stroke="#F26200" strokeWidth="2"/>
        </svg>
      </div>
      <div className={styles.content}>
        <h2>Welcome, young learner!</h2>
        <p>Let's start your adventure. Ready for a new challenge?</p>
        <button className={styles.tactileButton}>Start Learning</button>
      </div>
    </div>
  );
}