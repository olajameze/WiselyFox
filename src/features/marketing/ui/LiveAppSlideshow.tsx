"use client";

import { useEffect, useMemo, useState } from "react";
import slideStyles from "./LiveAppSlideshow.module.css";

const SLIDE_DEFS = [
  {
    title: "Child home",
    desc: "Today's goals, streaks, and calm visual schedule",
    themeKey: "themeChildHome" as const,
  },
  {
    title: "Lesson player",
    desc: "Step-by-step chunks with optional hints and gentle celebrations",
    themeKey: "themeLesson" as const,
  },
  {
    title: "Parent dashboard",
    desc: "Progress, mastery charts, and weekly study time at a glance",
    themeKey: "themeParent" as const,
  },
  {
    title: "Focus timer",
    desc: "Movement breaks and ADHD-friendly session blocks",
    themeKey: "themeFocus" as const,
  },
  {
    title: "Calm mode",
    desc: "Reduced motion and softer colours for anxious learners",
    themeKey: "themeCalm" as const,
  },
];

const THEME_CLASSES = {
  themeChildHome: slideStyles.themeChildHome,
  themeLesson: slideStyles.themeLesson,
  themeParent: slideStyles.themeParent,
  themeFocus: slideStyles.themeFocus,
  themeCalm: slideStyles.themeCalm,
} as const;

export function LiveAppSlideshow() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const slides = useMemo(
    () =>
      SLIDE_DEFS.map((slide) => ({
        ...slide,
        theme: THEME_CLASSES[slide.themeKey],
      })),
    [],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, [reducedMotion, slides.length]);

  if (reducedMotion) {
    return (
      <div className={slideStyles.staticGrid}>
        {slides.map((s) => (
          <div key={s.title} className={[slideStyles.staticCard, s.theme].join(" ")}>
            <strong>{s.title}</strong>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  const slide = slides[index];

  return (
    <div className={slideStyles.wrapper}>
      <div className={slideStyles.device}>
        <div className={[slideStyles.screen, slide.theme].join(" ")}>
          <div className={slideStyles.mockNav} />
          <h3>{slide.title}</h3>
          <p>{slide.desc}</p>
          <div className={slideStyles.mockCards}>
            <div className={slideStyles.mockCard} />
            <div className={slideStyles.mockCard} />
          </div>
        </div>
      </div>
      <div className={slideStyles.controls}>
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        >
          ‹
        </button>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
            className={i === index ? slideStyles.dotActive : slideStyles.dot}
            onClick={() => setIndex(i)}
          />
        ))}
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
