"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { PreferenceIconGroup } from "@/shared/ui/PreferenceIconGroup/PreferenceIconGroup";
import { useScrollSpy } from "@/shared/hooks/useScrollSpy";
import styles from "./Header.module.css";

interface HeaderProps {
  signedIn?: boolean;
  variant?: "default" | "notebook";
}

const SECTION_IDS = ["features", "pricing", "faq", "inclusive", "demo", "waitlist"];

const mainNav = [
  { href: "/#features", label: "Features", sectionId: "features" },
  { href: "/tutors", label: "Tutors", sectionId: null },
  { href: "/#pricing", label: "Pricing", sectionId: "pricing" },
  { href: "/#faq", label: "FAQ", sectionId: "faq" },
] as const;

export function Header({ signedIn, variant = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);
  const isNotebook = variant === "notebook";

  return (
    <header
      className={[
        styles.header,
        isNotebook ? styles.headerNotebook : "",
        menuOpen ? styles.open : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark} aria-hidden="true">
            🦊
          </span>
          <span className={styles.logoText}>WiselyFox</span>
        </Link>

        <nav
          className={[styles.nav, isNotebook ? styles.navNotebook : ""].filter(Boolean).join(" ")}
          aria-label="Main"
        >
          {mainNav.map((item) => {
            const isActive = item.sectionId ? activeSection === item.sectionId : false;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? styles.navLinkActive : styles.navLink}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          {signedIn ? (
            <Link href="/parent">
              <Button size="sm">Dashboard</Button>
            </Link>
          ) : (
            <>
              <div className={styles.authLinks}>
                <Link href="/sign-in" className={styles.textLink}>
                  Sign in
                </Link>
                <span className={styles.authDivider} aria-hidden="true">
                  |
                </span>
                <Link href="/tutor/sign-in" className={styles.textLink}>
                  Tutor
                </Link>
              </div>
              <Link href="/tutor/sign-up" className={styles.tutorCta}>
                <Button variant="ghost" size="sm">
                  Teach
                </Button>
              </Link>
              <Link href="/sign-up" className={styles.joinCta}>
                <Button size="sm">Join free</Button>
              </Link>
              </>
            )}
            <PreferenceIconGroup className={styles.headerPrefsDesktop} placement="bottom" />
            {menuOpen ? (
            <button
              type="button"
              className={styles.menuBtn}
              aria-label="Close menu"
              aria-expanded="true"
              aria-controls="header-mobile-nav"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          ) : (
            <button
              type="button"
              className={styles.menuBtn}
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="header-mobile-nav"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav
          id="header-mobile-nav"
          className={[styles.mobileNav, isNotebook ? styles.mobileNavNotebook : ""]
            .filter(Boolean)
            .join(" ")}
          aria-label="Mobile"
        >
          <div className={styles.mobilePrefs}>
            <PreferenceIconGroup placement="bottom" />
          </div>
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
<Link href="/#inclusive" onClick={() => setMenuOpen(false)}>
            Inclusive learning
          </Link>
          <div className={styles.mobileAuth}>
            <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
              Sign in (parent)
            </Link>
            <Link href="/tutor/sign-in" onClick={() => setMenuOpen(false)}>
              Sign in (tutor)
            </Link>
            <Link href="/tutor/sign-up" onClick={() => setMenuOpen(false)}>
              Become a tutor
            </Link>
            <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
              Join family pilot
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
