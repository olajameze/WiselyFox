import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  calm?: boolean;
}

export function ProgressBar({ value, max = 100, label, calm }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const safeValue = Math.round(value);
  const safeMax = Math.round(max);

  return (
    <div className={[styles.wrapper, calm ? styles.calm : ""].filter(Boolean).join(" ")}>
      {(label || max !== 100) && (
        <div className={styles.header}>
          {label && <span>{label}</span>}
          <span>{Math.round(percent)}%</span>
        </div>
      )}
      <progress
        className={styles.progress}
        value={safeValue}
        max={safeMax}
        aria-label={label ?? "Progress"}
      />
    </div>
  );
}
