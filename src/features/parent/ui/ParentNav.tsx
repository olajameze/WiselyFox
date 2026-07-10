"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./parent.module.css";

const nav = [
  { href: "/parent", label: "Overview", exact: true },
  { href: "/tutors", label: "Tutors" },
  { href: "/parent/children", label: "Children" },
  { href: "/parent/progress", label: "Progress" },
  { href: "/parent/rewards", label: "Rewards" },
  { href: "/parent/notifications", label: "Notifications" },
  { href: "/parent/settings", label: "Settings" },
];

export function ParentNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebarNav} aria-label="Parent dashboard">
      {nav.map((item) => {
        const active =
          item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[styles.navLink, active ? styles.navLinkActive : ""]
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
