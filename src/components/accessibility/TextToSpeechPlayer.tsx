"use client";

import { useTextToSpeech } from "@/shared/hooks/useTextToSpeech";
import styles from "./TextToSpeechPlayer.module.css";

export interface TextToSpeechPlayerProps {
  text: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showStopButton?: boolean;
}

export function TextToSpeechPlayer({
  text,
  label = "Read aloud",
  size = "md",
  className = "",
  showStopButton = true,
}: TextToSpeechPlayerProps) {
  const { speak, pause, resume, cancel, isPlaying, isPaused, isSupported } =
    useTextToSpeech();

  if (!isSupported) {
    return null;
  }

  const handleToggle = () => {
    if (isPlaying && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      speak(text);
    }
  };

  const buttonLabel = isPlaying
    ? isPaused
      ? "Resume reading"
      : "Pause reading"
    : label;

  const sizeClass = size === "sm" ? styles.sm : size === "lg" ? styles.lg : "";

  return (
    <div
      className={[styles.container, sizeClass, className].filter(Boolean).join(" ")}
      role="region"
      aria-label="Text to speech audio player"
    >
      <button
        type="button"
        onClick={handleToggle}
        className={[styles.button, isPlaying && !isPaused ? styles.playing : ""]
          .filter(Boolean)
          .join(" ")}
        aria-label={`${buttonLabel}: ${text.slice(0, 40)}...`}
        aria-pressed={isPlaying && !isPaused}
      >
        <span
          className={[styles.icon, isPlaying && !isPaused ? styles.pulse : ""]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        >
          {isPlaying ? (isPaused ? "▶️" : "⏸️") : "🔊"}
        </span>
        <span className={styles.label}>
          {isPlaying ? (isPaused ? "Resume" : "Pause") : label}
        </span>
      </button>

      {isPlaying && showStopButton && (
        <button
          type="button"
          onClick={cancel}
          className={styles.stopButton}
          aria-label="Stop audio reading"
        >
          <span className={styles.icon} aria-hidden="true">
            ⏹️
          </span>
          <span className={styles.label}>Stop</span>
        </button>
      )}

      {/* Screen-reader live announcement */}
      <span className="sr-only" aria-live="polite">
        {isPlaying
          ? isPaused
            ? "Speech paused"
            : "Reading aloud"
          : "Speech stopped"}
      </span>
    </div>
  );
}

export default TextToSpeechPlayer;
