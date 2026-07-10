"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminNavClose } from "./AdminSidebar";
import styles from "./admin.module.css";

const nav = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/tutors", label: "Tutors" },
  { href: "/admin/fraud", label: "Fraud queue" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/insights", label: "Insights" },
  { href: "/admin/audit", label: "Audit log" },
  { href: "/admin/system", label: "System" },
];

export function AdminNav() {
  const pathname = usePathname();
  const closeNav = useAdminNavClose();

  return (
    <nav className={styles.sidebarNav} aria-label="Admin dashboard">
      {nav.map((item) => {
        const active =
          item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => closeNav?.()}
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
