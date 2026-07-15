import styles from "@/features/parent/ui/parent.module.css";

export default function AdminLoading() {
  return (
    <div className={styles.dashboard} aria-busy="true" aria-label="Loading">
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonCard} />
      <div className={styles.skeletonCard} />
      <div className={styles.skeletonCard} />
    </div>
  );
}
