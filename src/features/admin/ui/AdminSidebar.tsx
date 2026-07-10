"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import styles from "./admin.module.css";

const AdminNavCloseContext = createContext<(() => void) | null>(null);

export function useAdminNavClose() {
  return useContext(AdminNavCloseContext);
}

export function AdminSidebar({
  email,
  nav,
  footer,
}: {
  email: string;
  nav: React.ReactNode;
  footer: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => setNavOpen(false);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  return (
    <AdminNavCloseContext.Provider value={closeNav}>
      <header className={styles.mobileBar}>
        {navOpen ? (
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Close admin menu"
            aria-expanded="true"
            aria-controls="admin-sidebar"
            onClick={closeNav}
          >
            ✕
          </button>
        ) : (
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Open admin menu"
            aria-expanded="false"
            aria-controls="admin-sidebar"
            onClick={() => setNavOpen(true)}
          >
            ☰
          </button>
        )}
        <Link href="/admin" className={styles.mobileBrand}>
          WiselyFox Admin
        </Link>
      </header>

      {navOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close admin menu"
          onClick={closeNav}
        />
      )}

      <aside
        id="admin-sidebar"
        className={[styles.sidebar, navOpen ? styles.sidebarOpen : ""].filter(Boolean).join(" ")}
      >
        <Link href="/admin" className={styles.sidebarBrand} onClick={closeNav}>
          WiselyFox Admin
        </Link>
        <p className={styles.sidebarUser} title={email}>
          {email}
        </p>
        <div className={styles.sidebarNavWrap}>{nav}</div>
        <div className={styles.sidebarFooter}>{footer}</div>
      </aside>
    </AdminNavCloseContext.Provider>
  );
}
