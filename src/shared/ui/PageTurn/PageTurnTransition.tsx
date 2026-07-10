"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./PageTurnTransition.module.css";

const APP_ROUTE =
  /^\/(learn|parent|admin|tutor|sign-in|sign-up|child-sign-in)(\/|$)/;

export function isAppRoute(pathname: string): boolean {
  return APP_ROUTE.test(pathname);
}

function readReducedMotionPreference(): boolean {
  if (typeof window === "undefined") return false;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  const learnRoot = document.querySelector(".learn-accessibility-root");
  if (learnRoot?.getAttribute("data-reduced-motion") === "true") {
    return true;
  }

  return (
    document.documentElement.dataset.dashboardReducedMotion === "true" ||
    document.documentElement.dataset.parentReducedMotion === "true"
  );
}

export function PageTurnTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathnameRef = useRef(pathname);
  const hasMountedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const onAppRoute = isAppRoute(pathname);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(readReducedMotionPreference());

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [pathname]);

  const routeChanged =
    hasMountedRef.current && previousPathnameRef.current !== pathname;
  const shouldAnimate = onAppRoute && routeChanged && !reducedMotion;

  useEffect(() => {
    hasMountedRef.current = true;
    previousPathnameRef.current = pathname;
  }, [pathname]);

  if (!onAppRoute) {
    return children;
  }

  return (
    <div className={styles.viewport}>
      <div
        key={pathname}
        className={[styles.page, shouldAnimate ? styles.pageEnter : ""].filter(Boolean).join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
