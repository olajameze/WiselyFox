"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminNavClose } from "./AdminSidebar";
import styles from "./admin.module.css";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/tutors", label: "Tutors", icon: "🎓" },
  { href: "/admin/users", label: "Users & Roles", icon: "👥" },
  { href: "/admin/fraud", label: "Fraud Queue", icon: "🛡️" },
  { href: "/admin/insights", label: "Insights", icon: "📈" },
  { href: "/admin/audit", label: "Audit Log", icon: "📋" },
  { href: "/admin/system", label: "System Health", icon: "⚙️" },
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
            <span className={styles.navIcon} aria-hidden="true">
              {item.icon}
            </span>
            <span className={styles.navLabel}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
