/** Normalize typed access codes: trim, lowercase, spaces/underscores → hyphens. */
export function normalizeAccessCodeInput(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Alphanumeric-only key so `wfoxdemoalex` matches `wfox-demo-alex`. */
export function accessCodeCompactKey(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}
