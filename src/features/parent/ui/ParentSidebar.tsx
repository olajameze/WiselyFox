import Link from "next/link";
import styles from "@/components/dashboard/Sidebar.module.css"; // Reusing student sidebar styles for consistency

interface ParentSidebarProps {
  userName: string;
}

export function ParentSidebar({ userName }: ParentSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.identity}>
        <div className={styles.avatar}></div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.ageBand}>Parent Account</span>
        </div>
      </div>

      <nav className={styles.navGroup}>
        <h3 className={styles.navTitle}>Family</h3>
        <Link href="/parent" className={styles.navLink}>
          Dashboard
        </Link>
        <Link href="/parent/children" className={styles.navLink}>
          Manage Children
        </Link>
        <Link href="/parent/billing" className={styles.navLink}>
          Billing &amp; Plan
        </Link>
      </nav>

      <div className={styles.navGroup}>
        <h3 className={styles.navTitle}>Account</h3>
        <Link href="/parent/settings" className={styles.navLink}>
          Settings
        </Link>
      </div>
    </aside>
  );
}