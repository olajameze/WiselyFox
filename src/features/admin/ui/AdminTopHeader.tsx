"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AdminAccountMenu } from "./AdminAccountMenu";
import styles from "./admin.module.css";

interface AdminTopHeaderProps {
  email: string;
  name: string;
}

const NOTIFICATIONS = [
  {
    id: "1",
    title: "Safety Alert: Fraud Review Flagged",
    desc: "A new signup was scored for risk review.",
    time: "10m ago",
    link: "/admin/fraud",
    icon: "🛡️",
    unread: true,
  },
  {
    id: "2",
    title: "Household Milestone",
    desc: "New family joined the pilot program.",
    time: "1h ago",
    link: "/admin/users",
    icon: "👥",
    unread: true,
  },
  {
    id: "3",
    title: "Tutor Verification Pending",
    desc: "New educator profile submitted for review.",
    time: "2h ago",
    link: "/admin/tutors",
    icon: "🎓",
    unread: false,
  },
];

export function AdminTopHeader({ email, name }: AdminTopHeaderProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);
  const initial = (name || email || "A").charAt(0).toUpperCase();

  const unreadCount = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
    }
    if (showNotifs) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifs]);

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  return (
    <header className={styles.dashHeader}>
      <div className={styles.headerSearchWrap}>
        <span className={styles.searchIcon} aria-hidden="true">
          🔍
        </span>
        <input
          type="search"
          placeholder="Search records, users, tutors..."
          className={styles.headerSearchInput}
          aria-label="Search"
        />
      </div>

      <div className={styles.headerActionsWrap}>
        {/* Notification Bell with interactive popover */}
        <div className={styles.notifWrapper} ref={notifRef}>
          <button
            type="button"
            className={`${styles.iconActionButton} ${showNotifs ? styles.iconActive : ""}`}
            aria-label={`View notifications (${unreadCount} unread)`}
            aria-expanded={showNotifs}
            onClick={() => setShowNotifs((prev) => !prev)}
            title="Notifications"
          >
            <span className={styles.bellIcon} aria-hidden="true">
              🔔
            </span>
            {unreadCount > 0 && <span className={styles.activeDotBadge} />}
          </button>

          {showNotifs && (
            <div className={styles.notifPopover} role="dialog" aria-label="Notifications popover">
              <div className={styles.notifHeader}>
                <div className={styles.notifTitleRow}>
                  <h3 className={styles.notifHeading}>Notifications</h3>
                  {unreadCount > 0 && (
                    <span className={styles.notifCountPill}>{unreadCount} new</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button type="button" className={styles.markReadBtn} onClick={markAllRead}>
                    Mark all read
                  </button>
                )}
              </div>

              <div className={styles.notifList}>
                {notifs.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    className={`${styles.notifItem} ${item.unread ? styles.notifUnread : ""}`}
                    onClick={() => setShowNotifs(false)}
                  >
                    <span className={styles.notifItemIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                    <div className={styles.notifItemContent}>
                      <span className={styles.notifItemTitle}>{item.title}</span>
                      <span className={styles.notifItemDesc}>{item.desc}</span>
                      <time className={styles.notifItemTime}>{item.time}</time>
                    </div>
                  </Link>
                ))}
              </div>

              <div className={styles.notifFooter}>
                <Link
                  href="/admin/audit"
                  className={styles.notifFooterLink}
                  onClick={() => setShowNotifs(false)}
                >
                  View full audit events →
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className={styles.languageBadge} title="Language selection">
          <span className={styles.flagEmoji} aria-hidden="true">
            🇬🇧
          </span>
          <span className={styles.langLabel}>English (UK)</span>
        </div>

        <div className={styles.userProfilePill}>
          <div className={styles.userAvatarInitials} aria-hidden="true">
            {initial}
          </div>
          <div className={styles.userInfoStack}>
            <span className={styles.userNameDisplay} title={name || email}>
              {name || "Administrator"}
            </span>
            <span className={styles.userRoleTag}>Super Admin</span>
          </div>
          <div className={styles.userAccountMenuAnchor}>
            <AdminAccountMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
