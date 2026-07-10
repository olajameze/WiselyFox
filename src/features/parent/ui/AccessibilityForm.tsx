"use client";

import { useState } from "react";
import { Button, Input, Alert } from "@/shared/ui";
import { updateChildAccessibility } from "@/features/parent/actions/household.actions";
import styles from "./parent.module.css";

type Props = {
  childId: string;
  initial: {
    calmColors: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
    dyslexiaFriendly: boolean;
    largeText: boolean;
    soundEnabled: boolean;
    hideTimers: boolean;
    sessionLengthMinutes: number;
  };
};

export function AccessibilityForm({ childId, initial }: Props) {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const result = await updateChildAccessibility({ childId, ...form });
    setLoading(false);
    if (result.success) setMessage("Accessibility settings saved. Your child will see changes on next page load.");
    else setError(result.error);
  }

  function enableCalmMode() {
    setForm({
      ...form,
      calmColors: true,
      reducedMotion: true,
      hideTimers: true,
      soundEnabled: false,
    });
  }

  return (
    <form className={styles.deleteForm} onSubmit={handleSubmit}>
      {error && <Alert variant="error">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      <Alert variant="info" title="Calm mode">
        Softer colours, no confetti-style celebrations, and optional timers off, learning without
        overwhelm.
      </Alert>
      <Button type="button" variant="secondary" size="sm" onClick={enableCalmMode}>
        Enable full calm mode
      </Button>

      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={form.calmColors}
          onChange={(e) => setForm({ ...form, calmColors: e.target.checked })}
        />
        Calm colours (softer palette)
      </label>
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={form.reducedMotion}
          onChange={(e) => setForm({ ...form, reducedMotion: e.target.checked })}
        />
        Reduced motion (no shake or confetti-style effects)
      </label>
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={form.hideTimers}
          onChange={(e) => setForm({ ...form, hideTimers: e.target.checked })}
        />
        Hide countdown timers (less time pressure)
      </label>
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={form.highContrast}
          onChange={(e) => setForm({ ...form, highContrast: e.target.checked })}
        />
        High contrast
      </label>
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={form.dyslexiaFriendly}
          onChange={(e) => setForm({ ...form, dyslexiaFriendly: e.target.checked })}
        />
        Dyslexia friendly text (spacing & font)
      </label>
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={form.largeText}
          onChange={(e) => setForm({ ...form, largeText: e.target.checked })}
        />
        Larger text (easier reading on phone and tablet)
      </label>
      <label className={styles.checkboxRow}>
        <input
          type="checkbox"
          checked={form.soundEnabled}
          onChange={(e) => setForm({ ...form, soundEnabled: e.target.checked })}
        />
        Sound effects (focus timer completion chime)
      </label>
      <Input
        type="number"
        label="Session length (minutes)"
        min={5}
        max={45}
        value={String(form.sessionLengthMinutes)}
        onChange={(e) =>
          setForm({ ...form, sessionLengthMinutes: Number(e.target.value) })
        }
      />
      <Button type="submit" loading={loading}>
        Save accessibility settings
      </Button>
    </form>
  );
}
