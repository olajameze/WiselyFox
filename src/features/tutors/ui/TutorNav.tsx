"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./tutor.module.css";

const nav = [
  { href: "/tutor", label: "Overview", exact: true },
  { href: "/tutor/profile", label: "My profile" },
  { href: "/tutor/inquiries", label: "Inquiries" },
  { href: "/tutor/bookings", label: "Bookings" },
  { href: "/tutor/students", label: "Students" },
];

export function TutorNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebarNav} aria-label="Tutor dashboard">
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
