"use client";

import { useEffect, useState } from "react";

export interface UseScrollSpyOptions {
  offset?: number;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {},
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { offset = 80, rootMargin, threshold = 0.2 } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const computedRootMargin = rootMargin ?? `-${offset}px 0px -40% 0px`;

    const visibleEntries = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleEntries.set(entry.target.id, entry);
        });

        // Find the visible section
        let currentActive: string | null = null;
        for (const id of sectionIds) {
          const entry = visibleEntries.get(id);
          if (entry && entry.isIntersecting) {
            currentActive = id;
            break;
          }
        }

        if (currentActive) {
          setActiveId(currentActive);
        } else {
          // Scroll fallback for edge cases
          const scrollPosition = window.scrollY + offset + 20;
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                currentActive = sectionIds[i];
                break;
              }
            }
          }
          if (currentActive) {
            setActiveId(currentActive);
          }
        }
      },
      {
        rootMargin: computedRootMargin,
        threshold,
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offset, rootMargin, threshold]);

  return activeId;
}
