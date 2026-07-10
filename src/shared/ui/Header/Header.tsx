"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./Header.module.css";

interface HeaderProps {
  signedIn?: boolean;
  variant?: "default" | "notebook";
}

const mainNav = [
  { href: "/#features", label: "Features" },
  { href: "/tutors", label: "Tutors" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function Header({ signedIn, variant = "default" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <Link href="/" className={[styles.logo, isNotebook ? styles.logoNotebook : ""].filter(Boolean).join(" ")}>
          {isNotebook ? (
            <>
              <span className={styles.logoMark} aria-hidden="true">
                📖
              </span>
              WiselyFox
            </>
          ) : (
            "WiselyFox"
          )}
        </Link>

        <nav
          className={[styles.nav, isNotebook ? styles.navNotebook : ""].filter(Boolean).join(" ")}
          aria-label="Main"
        >
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
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
