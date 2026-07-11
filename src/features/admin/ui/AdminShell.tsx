import Link from "next/link";
import { requireSuperAdmin } from "@/shared/lib/permissions";
import { AdminNav } from "./AdminNav";
import { AdminAccountMenu } from "./AdminAccountMenu";
import { AdminSidebar } from "./AdminSidebar";
import { PreferenceIconGroup } from "@/shared/ui/PreferenceIconGroup/PreferenceIconGroup";
import groupStyles from "@/shared/ui/PreferenceIconGroup/PreferenceIconGroup.module.css";
import shellStyles from "@/shared/ui/DashboardAccountMenu/DashboardAccountMenu.module.css";
import styles from "./admin.module.css";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const user = await requireSuperAdmin();

  return (
    <div className={styles.shell}>
      <AdminSidebar
        email={user.email ?? "Admin"}
        nav={<AdminNav />}
        footer={
          <div className={[shellStyles.sidebarBottom, shellStyles.sidebarBottomDark].join(" ")}>
            <PreferenceIconGroup
              className={groupStyles.sidebarGroup}
              hint="Adjust how the admin console looks on this device."
            />
            <AdminAccountMenu />
            <Link href="/" className={[shellStyles.sidebarBackLink, shellStyles.sidebarBackLinkDark].join(" ")}>
              Back to site
            </Link>
          </div>
        }
      />
      <main className={styles.shellMain}>{children}</main>
    </div>
  );
}
