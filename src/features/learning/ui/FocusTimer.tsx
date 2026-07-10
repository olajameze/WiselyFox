"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button, Card, ProgressBar, Alert, Badge } from "@/shared/ui";
import { completeFocusSession } from "@/features/learning/actions/learning.actions";
import { playFocusCompleteAlert } from "@/features/learning/lib/focus-completion-alert";
import type { AccommodationRules } from "@/features/inclusive/services/accommodation.service";
import styles from "./learnActivity.module.css";

const MIN_MINUTES = 5;
const MAX_MINUTES = 45;
const STEP = 5;
const BREAK_SECONDS = 120;

type Phase = "ready" | "studying" | "break" | "paused" | "completed";

type Props = {
  sessionMinutes: number;
  reducedMotion?: boolean;
  soundEnabled?: boolean;
  calm?: boolean;
  showTimer?: boolean;
  breakEveryMinutes?: number | null;
  celebrationIntensity?: AccommodationRules["celebrationIntensity"];
};

export function FocusTimer({
  sessionMinutes,
  reducedMotion = false,
  soundEnabled = true,
  calm = false,
  showTimer = true,
  breakEveryMinutes = null,
  celebrationIntensity = "medium",
}: Props) {
  const base = Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, sessionMinutes));
  const [minutes, setMinutes] = useState(base);
  const total = minutes * 60;
  const [seconds, setSeconds] = useState(total);
  const [breakSeconds, setBreakSeconds] = useState(BREAK_SECONDS);
  const [blockStudied, setBlockStudied] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const completingRef = useRef(false);

  const noCelebration = celebrationIntensity === "none";
  const running = phase === "studying";
  const onBreak = phase === "break";
  const inSession = phase === "studying" || phase === "paused" || phase === "break";

  useEffect(() => {
    if (!inSession) {
      setSeconds(minutes * 60);
      setBlockStudied(0);
      setBreakSeconds(BREAK_SECONDS);
    }
  }, [minutes, inSession]);

  useEffect(() => {
    if (!running || seconds <= 0 || !breakEveryMinutes) return;
    const id = setInterval(() => {
      setSeconds((s) => s - 1);
      setBlockStudied((b) => b + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running, seconds, breakEveryMinutes]);

  useEffect(() => {
    if (!running || seconds <= 0 || breakEveryMinutes) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running, seconds, breakEveryMinutes]);

  useEffect(() => {
    if (!breakEveryMinutes || phase !== "studying") return;
    if (blockStudied > 0 && blockStudied >= breakEveryMinutes * 60) {
      setPhase("break");
      setBreakSeconds(BREAK_SECONDS);
      setBlockStudied(0);
    }
  }, [blockStudied, breakEveryMinutes, phase]);

  useEffect(() => {
    if (!onBreak || breakSeconds <= 0) return;
    const id = setInterval(() => setBreakSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [onBreak, breakSeconds]);

  useEffect(() => {
    if (onBreak && breakSeconds === 0) {
      setPhase("studying");
      setBreakSeconds(BREAK_SECONDS);
    }
  }, [onBreak, breakSeconds]);

  const handleComplete = useCallback(async () => {
    if (completingRef.current) return;
    completingRef.current = true;
    setPhase("completed");
    const quiet = noCelebration || reducedMotion;
    playFocusCompleteAlert(quiet, soundEnabled && !noCelebration);
    if (!quiet) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 1200);
    }
    setLoading(true);
    const result = await completeFocusSession(minutes);
    setLoading(false);
    if (result.success) {
      setXp(result.data.xp);
    }
  }, [minutes, reducedMotion, soundEnabled, noCelebration]);

  useEffect(() => {
    if (seconds !== 0 || !running) return;
    void handleComplete();
  }, [seconds, running, handleComplete]);

  function adjustMinutes(delta: number) {
    if (inSession) return;
    setMinutes((m) => Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, m + delta)));
  }

  function startStudying() {
    completingRef.current = false;
    setCelebrate(false);
    setPhase("studying");
  }

  function pauseStudying() {
    setPhase("paused");
  }

  function stopSession() {
    completingRef.current = false;
    setCelebrate(false);
    setPhase("ready");
    setSeconds(minutes * 60);
    setBlockStudied(0);
    setBreakSeconds(BREAK_SECONDS);
    setXp(0);
    setLoading(false);
  }

  function restartSession() {
    stopSession();
  }

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const breakMins = Math.floor(breakSeconds / 60);
  const breakSecs = breakSeconds % 60;
  const elapsedPct = ((total - seconds) / total) * 100;

  const statusLabel =
    phase === "break"
      ? "Movement break"
      : phase === "studying"
        ? "Studying now"
        : phase === "paused"
          ? "Paused"
          : phase === "completed"
            ? noCelebration ? "Session finished" : "Session complete"
            : "Ready to study";

  return (
    <Card className={styles.textCenter}>
      <h2>Focus mode</h2>
      <p className={styles.learnMeta}>
        {breakEveryMinutes
          ? `Short ${breakEveryMinutes}-minute blocks with 2-minute movement breaks (ADHD informed).`
          : `Set your session length (parent default: ${sessionMinutes} min).`}
      </p>

      <div
        className={[
          styles.focusStatus,
          phase === "studying" ? styles.focusStatusActive : "",
          phase === "paused" ? styles.focusStatusPaused : "",
        ]
          .filter(Boolean)
          .join(" ")}
        role="status"
        aria-live="polite"
      >
        <Badge variant={phase === "studying" ? "success" : "default"}>{statusLabel}</Badge>
        {phase === "studying" && (
          <span className={styles.focusStudyingHint}>Stay with your lesson or study guide</span>
        )}
        {phase === "break" && (
          <span className={styles.focusStudyingHint}>
            Stand, stretch, sip water, no screens needed
          </span>
        )}
      </div>

      {!inSession && phase !== "completed" && (
        <div className={styles.btnGroup}>
          <Button size="sm" variant="secondary" onClick={() => adjustMinutes(-STEP)}>
            −{STEP} min
          </Button>
          <BadgeLike>{minutes} minutes</BadgeLike>
          <Button size="sm" variant="secondary" onClick={() => adjustMinutes(STEP)}>
            +{STEP} min
          </Button>
        </div>
      )}

      {onBreak ? (
        <>
          {showTimer ? (
            <p className={styles.focusTimer} aria-label={`${breakMins} minutes break remaining`}>
              Break {breakMins}:{breakSecs.toString().padStart(2, "0")}
            </p>
          ) : (
            <p className={styles.learnMeta}>Take a calm movement break</p>
          )}
          <ProgressBar
            value={((BREAK_SECONDS - breakSeconds) / BREAK_SECONDS) * 100}
            calm={calm}
            label="Movement break"
          />
        </>
      ) : showTimer ? (
        <>
          <p
            className={[
              styles.focusTimer,
              celebrate && !noCelebration && !reducedMotion ? styles.focusTimerCelebrate : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={`${mins} minutes and ${secs} seconds remaining`}
          >
            {mins}:{secs.toString().padStart(2, "0")}
          </p>
          <ProgressBar
            value={elapsedPct}
            calm={calm}
            label={phase === "studying" ? "Study time" : "Focus timer"}
          />
        </>
      ) : (
        <>
          <p className={styles.learnMeta}>Calm focus, no countdown pressure</p>
          <ProgressBar value={elapsedPct} calm={calm} label="Study progress" />
        </>
      )}

      {phase === "completed" ? (
        <Alert variant="success" title={noCelebration ? "Focus session finished" : "Focus session complete!"}>
          {noCelebration ? (
            <>You stayed focused for {minutes} minutes. +{xp} XP recorded.</>
          ) : (
            <>+{xp} XP, Stand up, stretch, and take a 2-minute movement break.</>
          )}
        </Alert>
      ) : seconds === 0 && loading ? (
        <Alert variant="info">Saving your session…</Alert>
      ) : onBreak ? (
        <Alert variant="info" title="Movement break">
          Walk in place, roll shoulders, or look out the window. Break ends automatically.
        </Alert>
      ) : (
        <div className={styles.btnGroup}>
          {phase === "ready" && (
            <Button size="sm" onClick={startStudying} disabled={loading}>
              Start studying
            </Button>
          )}
          {phase === "studying" && (
            <Button size="sm" variant="secondary" onClick={pauseStudying}>
              Pause
            </Button>
          )}
          {phase === "paused" && (
            <Button size="sm" onClick={startStudying}>
              Resume
            </Button>
          )}
          {inSession && !onBreak && (
            <>
              <Button size="sm" variant="ghost" onClick={stopSession}>
                Stop
              </Button>
              <Button size="sm" variant="secondary" onClick={restartSession}>
                Restart
              </Button>
            </>
          )}
        </div>
      )}

      {phase === "completed" && (
        <div className={styles.btnGroup}>
          <Button size="sm" variant="secondary" onClick={restartSession}>
            Study again
          </Button>
        </div>
      )}

      <div className={styles.btnGroup}>
        <Link href="/learn/subjects">
          <Button variant="ghost" size="sm">
            Open lessons
          </Button>
        </Link>
        <Link href="/learn">
          <Button variant="ghost" size="sm">
            Back home
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function BadgeLike({ children }: { children: React.ReactNode }) {
  return <span className={styles.durationBadge}>{children}</span>;
}
