import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner } from "@/shared/lib/permissions";
import { assertHouseholdAccess } from "@/shared/lib/permissions";
import { getWeekSchedule } from "@/features/parent/services/schedule.service";
import { ScheduleEditor } from "@/features/parent/ui/ScheduleEditor";
import { Card, Button } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ChildSchedulePage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const user = await requireParentOwner();
  const { childId } = await params;
  const child = await assertHouseholdAccess(childId, user.id);
  const week = await getWeekSchedule(childId);
  const initialItems = week.flatMap((d) =>
    d.items.map((item) => ({
      dayOfWeek: item.dayOfWeek,
      title: item.title,
      subject: item.subject ?? "",
      timeLabel: item.timeLabel ?? "",
      sortOrder: item.sortOrder,
    })),
  );

  return (
    <div className={styles.dashboard}>
      <Link href="/parent/children">
        <Button variant="ghost" size="sm">
          ← Children
        </Button>
      </Link>
      <header className={styles.pageHeader}>
        <h1>{child.displayName}&apos;s schedule</h1>
        <p className={styles.pageSubtitle}>
          Set a weekly learning plan. Today&apos;s items appear on your child&apos;s home screen.
        </p>
      </header>
      <Card>
        <ScheduleEditor childId={childId} initialItems={initialItems} />
      </Card>
    </div>
  );
}
