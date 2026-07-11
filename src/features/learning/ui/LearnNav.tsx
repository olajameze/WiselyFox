"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/features/parent/ui/parent.module.css";

export function LearnNav({ showFocusLink = true }: { showFocusLink?: boolean }) {
  const pathname = usePathname();

  const nav = [
    { href: "/learn", label: "Home", exact: true },
    { href: "/learn/subjects", label: "Subjects" },
    { href: "/learn/quiz", label: "Quizzes" },
    { href: "/learn/rewards", label: "Rewards" },
    { href: "/learn/certificates", label: "Certs" },
    ...(showFocusLink ? [{ href: "/learn/focus", label: "Focus", exact: false as const }] : []),
  ];

  return (
    <nav id="app-nav" className={styles.learnNav} aria-label="Learning navigation">
      {nav.map((item) => {
        const active =
          "exact" in item && item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[styles.learnNavLink, active ? styles.learnNavActive : ""]
              .filter(Boolean)
              .join(" ")}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
