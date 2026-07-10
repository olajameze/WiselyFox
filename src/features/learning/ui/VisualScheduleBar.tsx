"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/features/parent/ui/parent.module.css";

type ScheduleItem = {
  id: string;
  title: string;
  subject: string | null;
  timeLabel: string | null;
};

const DEFAULT_STEPS = [
  { id: "home", label: "Home", href: "/learn" },
  { id: "lesson", label: "Lesson", href: "/learn/subjects" },
  { id: "quiz", label: "Quiz", href: "/learn/quiz" },
  { id: "done", label: "Done", href: "/learn" },
] as const;

function stepActive(pathname: string, href: string) {
  if (href === "/learn") return pathname === "/learn";
  return pathname.startsWith(href);
}

export function VisualScheduleBar({
  items,
  showDefault,
}: {
  items: ScheduleItem[];
  showDefault: boolean;
}) {
  const pathname = usePathname();

  if (items.length > 0) {
    return (
      <nav className={styles.schedule} aria-label="Today's visual schedule">
        <Link
          href="/learn"
          className={[
            styles.scheduleStep,
            pathname === "/learn" ? styles.scheduleStepActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-current={pathname === "/learn" ? "step" : undefined}
        >
          Home
        </Link>
        {items.map((item, index) => {
          const href = item.subject ? `/learn/subjects/${item.subject}` : "/learn/subjects";
          const active = item.subject ? pathname.includes(`/learn/subjects/${item.subject}`) : false;
          return (
            <Link
              key={item.id}
              href={href}
              className={[styles.scheduleStep, active ? styles.scheduleStepActive : ""]
                .filter(Boolean)
                .join(" ")}
              title={item.timeLabel ?? undefined}
              aria-current={active ? "step" : undefined}
            >
              {index + 1}. {item.title}
            </Link>
          );
        })}
        <span className={styles.scheduleStep} aria-hidden="true">
          ✓ Done
        </span>
      </nav>
    );
  }

  if (!showDefault) return null;

  return (
    <nav className={styles.schedule} aria-label="Learning flow">
      {DEFAULT_STEPS.map((step) => {
        const active = stepActive(pathname, step.href);
        const isDone = step.id === "done";
        if (isDone) {
          return (
            <span key={step.id} className={styles.scheduleStep}>
              {step.label}
            </span>
          );
        }
        return (
          <Link
            key={step.id}
            href={step.href}
            className={[styles.scheduleStep, active ? styles.scheduleStepActive : ""]
              .filter(Boolean)
              .join(" ")}
            aria-current={active ? "step" : undefined}
          >
            {step.label}
          </Link>
        );
      })}
    </nav>
  );
}
