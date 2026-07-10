/** Short two-tone beep + device vibration when a focus session ends. */
export function playFocusCompleteAlert(reducedMotion = false, soundEnabled = true) {
  if (!reducedMotion && typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate([180, 90, 180, 90, 320]);
  }

  if (!soundEnabled || typeof window === "undefined") return;

  try {
    const ctx = new AudioContext();
    const playTone = (frequency: number, start: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    };
    const now = ctx.currentTime;
    playTone(880, now, 0.22);
    playTone(1174, now + 0.28, 0.28);
    void ctx.close();
  } catch {
    // Audio may be blocked until user gesture, vibration still signals completion.
  }
}
