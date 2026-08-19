import Link from "next/link";
import { requireSuperAdmin } from "@/shared/lib/permissions";
import { AdminNav } from "./AdminNav";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopHeader } from "./AdminTopHeader";
import { SidebarSignOut } from "@/shared/ui/DashboardAccountMenu/SidebarSignOut";
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
            <SidebarSignOut variant="dark" />
            <Link href="/" className={[shellStyles.sidebarBackLink, shellStyles.sidebarBackLinkDark].join(" ")}>
              Back to site
            </Link>
          </div>
        }
      />
      <div className={styles.mainCanvasColumn}>
        <AdminTopHeader
          email={user.email ?? "admin@wiselyfox.app"}
          name={user.name ?? "Super Admin"}
        />
        <main className={styles.shellMain}>{children}</main>
      </div>
    </div>
  );
}
