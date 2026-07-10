import Link from "next/link";
import { requireTutorProfile, getParentProfileForUser } from "@/shared/lib/permissions";
import { TutorNav } from "./TutorNav";
import { TutorAccountMenu } from "./TutorAccountMenu";
import { DashboardAccessibilityToolbar } from "@/shared/ui/DashboardAccessibilityToolbar/DashboardAccessibilityToolbar";
import { AppSkipLinks } from "@/shared/ui/AppSkipLinks/AppSkipLinks";
import shellStyles from "@/shared/ui/DashboardAccountMenu/DashboardAccountMenu.module.css";
import styles from "./tutor.module.css";

export async function TutorShell({ children }: { children: React.ReactNode }) {
  const { user } = await requireTutorProfile();
  const parentProfile = await getParentProfileForUser(user.id);

  return (
    <div className={styles.shell}>
      <AppSkipLinks mainId="tutor-main" />
      <aside className={styles.sidebar} id="app-nav" aria-label="Tutor dashboard navigation">
        <div className={styles.sidebarTop}>
          <Link href="/tutor" className={styles.sidebarBrand}>
            WiselyFox Tutor
          </Link>
          <p className={styles.sidebarUser}>{user.name ?? user.email ?? "Tutor account"}</p>
          <TutorNav />
        </div>
        <div className={shellStyles.sidebarBottom}>
          <TutorAccountMenu />
          {parentProfile && (
            <Link href="/parent" className={shellStyles.sidebarBackLink}>
              Switch to family
            </Link>
          )}
          <Link href="/" className={shellStyles.sidebarBackLink}>
            Back to site
          </Link>
        </div>
      </aside>
      <main id="tutor-main" className={styles.shellMain}>
        <DashboardAccessibilityToolbar hint="Adjust how the tutor dashboard looks on this device." />
        {children}
      </main>
    </div>
  );
}
