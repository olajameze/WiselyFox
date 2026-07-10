import { requireSuperAdmin, getSessionUser } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { Card, Badge } from "@/shared/ui";
import { UserManageActions } from "@/features/admin/ui/UserManageActions";
import styles from "@/features/admin/ui/admin.module.css";

export default async function AdminUsersPage() {
  await requireSuperAdmin();
  const session = await getSessionUser();

  const users = await prisma.user.findMany({
    include: {
      parentProfile: { include: { subscription: true, children: true } },
      childProfile: { include: { parent: { include: { user: true } } } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>Users</h1>
        <p className={styles.pageSubtitle}>
          Manage parent, child, and admin accounts. Deleting a parent removes their household data
          and child logins.
        </p>
      </header>

      <Card>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email / Name</th>
                <th>Role</th>
                <th>Plan</th>
                <th>Joined</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const confirmLabel =
                  u.email ?? u.name ?? u.childProfile?.displayName ?? u.id;
                return (
                <tr key={u.id}>
                  <td>
                    {u.email ?? u.name ?? u.childProfile?.displayName ?? "—"}
                    {u.childProfile && (
                      <div className={styles.meta}>
                        Child of {u.childProfile.parent.user.email ?? "parent"}
                      </div>
                    )}
                  </td>
                  <td>
                    <Badge variant={u.role === "SUPERADMIN" ? "warning" : "default"}>
                      {u.role}
                    </Badge>
                  </td>
                  <td>
                    {u.parentProfile?.subscription?.plan ?? "—"}{" "}
                    {u.parentProfile?.children.length
                      ? `(${u.parentProfile.children.length} child)`
                      : ""}
                  </td>
                  <td>{u.createdAt.toLocaleDateString("en-GB")}</td>
                  <td>
                    <UserManageActions
                      userId={u.id}
                      confirmLabel={confirmLabel}
                      role={u.role}
                      isSelf={session?.id === u.id}
                    />
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
