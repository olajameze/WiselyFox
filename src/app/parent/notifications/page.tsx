import Link from "next/link";
import { redirect } from "next/navigation";
import { requireParentOwner } from "@/shared/lib/permissions";
import { getParentProfile, getParentNotifications } from "@/features/parent/services/parent-dashboard.service";
import { Card, Badge } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ParentNotificationsPage() {
  const user = await requireParentOwner();
  const parent = await getParentProfile(user.id);
  if (!parent) redirect("/sign-up");

  const notifications = await getParentNotifications(user.id);

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Notifications</h1>
        <p className={styles.pageSubtitle}>
          Trial reminders, quiz results, subject completions, rewards, and billing updates.
        </p>
      </header>

      <div className={styles.notificationList}>
        {notifications.length === 0 ? (
          <Card>
            <p className={styles.meta}>You&apos;re all caught up, no notifications yet.</p>
          </Card>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={[
                styles.notificationItem,
                !n.read ? styles.notificationItemUnread : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.childCardHeader}>
                <strong>{n.title}</strong>
                <Badge variant={n.read ? "default" : "warning"}>{n.type}</Badge>
              </div>
              <p>{n.body}</p>
              {n.linkUrl && (
                <Link href={n.linkUrl}>
                  <Badge variant="success">View details</Badge>
                </Link>
              )}
              <p className={styles.notificationMeta}>
                {n.createdAt.toLocaleString("en-GB")}
                {!n.read && ", Unread"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
