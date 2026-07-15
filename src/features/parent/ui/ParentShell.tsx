import Link from "next/link";
import { requireParentOwner } from "@/shared/lib/permissions";
import { ParentNav } from "./ParentNav";
import { AccountMenu } from "./AccountMenu";
import { PreferenceIconGroup } from "@/shared/ui/PreferenceIconGroup/PreferenceIconGroup";
import groupStyles from "@/shared/ui/PreferenceIconGroup/PreferenceIconGroup.module.css";
import { AppSkipLinks } from "@/shared/ui/AppSkipLinks/AppSkipLinks";
import shellStyles from "@/shared/ui/DashboardAccountMenu/DashboardAccountMenu.module.css";
import styles from "./parent.module.css";

export async function ParentShell({ children }: { children: React.ReactNode }) {
  const user = await requireParentOwner();

  return (
    <div className={styles.shell}>
      <AppSkipLinks mainId="parent-main" />
      <aside className={styles.sidebar} id="app-nav" aria-label="Parent dashboard navigation">
        <div className={styles.sidebarChrome}>
          <div className={styles.sidebarBrandRow}>
            <Link href="/parent" className={styles.sidebarBrand}>
              WiselyFox
            </Link>
            <div className={styles.sidebarQuickActions}>
              <PreferenceIconGroup
                className={[groupStyles.sidebarGroup, styles.sidebarPrefs].filter(Boolean).join(" ")}
                hint="Adjust how the parent dashboard looks on this device."
              />
              <AccountMenu />
            </div>
          </div>
          <p className={styles.sidebarUser}>{user.name ?? user.email ?? "Parent account"}</p>
        </div>
        <div className={styles.sidebarTop}>
          <ParentNav />
        </div>
        <div className={shellStyles.sidebarBottom}>
          <Link href="/" className={shellStyles.sidebarBackLink}>
            Back to site
          </Link>
        </div>
      </aside>
      <main id="parent-main" className={styles.shellMain}>
        {children}
      </main>
    </div>
  );
}
