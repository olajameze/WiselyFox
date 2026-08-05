/**
 * Strip off-platform payment strings and external links from tutor notes.
 * Guards against tutors steering families off-platform for payment.
 */
export function sanitizeTutorNotes(raw: string): string {
  const linkFree = raw.replace(/https?:\/\/\S+/gi, "[link removed]");
  return linkFree.replace(
    /\b(?:paypal|venmo|cashapp|bank\s*transfer|zelle|stripe\.me)\b/gi,
    "[payment method removed]",
  );
}
