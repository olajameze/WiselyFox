"use client";

type Props = {
  calmColors: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  dyslexiaFriendly: boolean;
  largeText: boolean;
};

export function LearnAccessibilityShell({
  calmColors,
  reducedMotion,
  highContrast,
  dyslexiaFriendly,
  largeText,
  children,
}: Props & { children: React.ReactNode }) {
  return (
    <div
      data-calm={calmColors ? "true" : "false"}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      data-high-contrast={highContrast ? "true" : "false"}
      data-dyslexia={dyslexiaFriendly ? "true" : "false"}
      data-large-text={largeText ? "true" : "false"}
      className="learn-accessibility-root"
    >
      {children}
    </div>
  );
}
