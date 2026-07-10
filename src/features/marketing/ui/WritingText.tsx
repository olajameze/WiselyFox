"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./WritingText.module.css";

type WritingTag = "span" | "h1" | "h2" | "h3" | "p" | "div";

interface WritingTextProps {
  text: string;
  as?: WritingTag;
  className?: string;
  /** Delay before typing starts (ms) */
  delay?: number;
  /** Milliseconds per character */
  speed?: number;
  /** Start animation when element enters viewport */
  startWhenVisible?: boolean;
}

export function WritingText({
  text,
  as = "span",
  className,
  delay = 0,
  speed = 42,
  startWhenVisible = false,
}: WritingTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [armed, setArmed] = useState(!startWhenVisible);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const reduced = mq.matches;
      setReducedMotion(reduced);
      if (reduced) {
        setVisibleChars(text.length);
        setArmed(true);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [text.length]);

  useEffect(() => {
    if (reducedMotion || armed || !startWhenVisible) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [armed, reducedMotion, startWhenVisible]);

  useEffect(() => {
    if (reducedMotion || !armed) return;

    let cancelled = false;
    let charTimer: ReturnType<typeof setTimeout> | undefined;

    const startTimer = setTimeout(() => {
      let index = 0;
      const tick = () => {
        if (cancelled) return;
        index += 1;
        setVisibleChars(index);
        if (index < text.length) {
          charTimer = setTimeout(tick, speed);
        }
      };
      tick();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      clearTimeout(charTimer);
    };
  }, [armed, delay, reducedMotion, speed, text]);

  const displayText = reducedMotion ? text : text.slice(0, visibleChars);
  const isComplete = visibleChars >= text.length || reducedMotion;

  const rootClassName = [styles.writing, className, isComplete ? styles.complete : ""]
    .filter(Boolean)
    .join(" ");

  const inkLine = (
    <span ref={ref} className={styles.inkLine}>
      {displayText}
      {!isComplete && <span className={styles.cursor} aria-hidden="true" />}
    </span>
  );

  return wrapWritingTag(as, rootClassName, inkLine);
}

function wrapWritingTag(tag: WritingTag, className: string, children: ReactNode) {
  switch (tag) {
    case "h1":
      return <h1 className={className}>{children}</h1>;
    case "h2":
      return <h2 className={className}>{children}</h2>;
    case "h3":
      return <h3 className={className}>{children}</h3>;
    case "p":
      return <p className={className}>{children}</p>;
    case "div":
      return <div className={className}>{children}</div>;
    default:
      return <span className={className}>{children}</span>;
  }
}
