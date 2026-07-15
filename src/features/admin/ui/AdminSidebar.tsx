"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import styles from "./admin.module.css";

const AdminNavCloseContext = createContext<(() => void) | null>(null);

export function useAdminNavClose() {
  return useContext(AdminNavCloseContext);
}

export function AdminSidebar({
  email,
  nav,
  footer,
  headerActions,
}: {
  email: string;
  nav: ReactNode;
  footer: ReactNode;
  headerActions?: ReactNode;
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
        {headerActions ? <div className={styles.mobileActions}>{headerActions}</div> : null}
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
        <div className={styles.sidebarChrome}>
          <div className={styles.sidebarBrandRow}>
            <Link href="/admin" className={styles.sidebarBrand} onClick={closeNav}>
              WiselyFox Admin
            </Link>
            {headerActions}
          </div>
          <p className={styles.sidebarUser} title={email}>
            {email}
          </p>
        </div>
        <div className={styles.sidebarNavWrap}>{nav}</div>
        <div className={styles.sidebarFooter}>{footer}</div>
      </aside>
    </AdminNavCloseContext.Provider>
  );
}
