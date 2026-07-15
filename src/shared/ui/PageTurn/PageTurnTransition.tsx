"use client";

/**
 * Previously remounted the tree with a ~1s page-turn on route changes.
 * That made every click feel laggy (especially auth ↔ marketing).
 * Kept as a pass-through so existing imports/tests keep working.
 */
export function isAppRoute(pathname: string): boolean {
  return /^\/(learn|parent|admin|tutor|sign-in|sign-up|child-sign-in)(\/|$)/.test(pathname);
}

export function PageTurnTransition({ children }: { children: React.ReactNode }) {
  return children;
}
