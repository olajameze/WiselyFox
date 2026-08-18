import styles from "./ActivityHub.module.css";

export function ActivityHub() {
  // Placeholder data for the circular progress meter
  const currentProgress = 75; // Example: 75% complete
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (currentProgress / 100) * circumference;

  return (
    <div className={styles.activityHub}>
      <div className={`${styles.card} ${styles.masteryBanner}`}>
        <h2>Rise Up Quiz Champion!</h2>
        <div className={styles.progressMeter}>
          <svg viewBox="0 0 100 100">
            <circle className={styles.circularBg} cx="50" cy="50" r="45"></circle>
            <circle
              className={styles.circularFg}
              cx="50" cy="50" r="45"
              style={{ strokeDasharray: circumference, strokeDashoffset }}
            ></circle>
            <text x="50" y="55" className={styles.circularText}>{currentProgress}%</text>
          </svg>
          <p>Challenge Progress</p>
        </div>
      </div>

      <div className={`${styles.card} ${styles.blueprintTrack}`}>
        <h3>Active Blueprint Track: Future of Tech</h3>
        <p>Explore the exciting world of artificial intelligence and robotics.</p>
        <div className={styles.trackActions}>
          <button className={styles.tactileButton}>
            Start Lesson
          </button>
        </div>
      </div>
    </div>
  );
}