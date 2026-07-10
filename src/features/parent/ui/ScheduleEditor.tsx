"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Alert } from "@/shared/ui";
import { saveChildSchedule } from "@/features/parent/actions/household.actions";
import styles from "./parent.module.css";

type ScheduleRow = {
  dayOfWeek: number;
  title: string;
  subject: string;
  timeLabel: string;
  sortOrder: number;
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function ScheduleEditor({
  childId,
  initialItems,
}: {
  childId: string;
  initialItems: ScheduleRow[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<ScheduleRow[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function addRow(dayOfWeek: number) {
    setItems([
      ...items,
      {
        dayOfWeek,
        title: "",
        subject: "",
        timeLabel: "",
        sortOrder: items.filter((i) => i.dayOfWeek === dayOfWeek).length,
      },
    ]);
  }

  function updateRow(index: number, patch: Partial<ScheduleRow>) {
    setItems(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function removeRow(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setLoading(true);
    setError("");
    setMessage("");
    const cleaned = items
      .filter((i) => i.title.trim())
      .map((i, idx) => ({ ...i, sortOrder: idx }));
    const result = await saveChildSchedule(childId, cleaned);
    setLoading(false);
    if (result.success) {
      setMessage("Schedule saved. Your child will see today's plan on their home screen.");
      router.refresh();
    } else {
      setError(result.error);
    }
  }

  return (
    <div>
      {error && <Alert variant="error">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      {DAY_NAMES.map((dayName, dayOfWeek) => (
        <div key={dayName} className={styles.scheduleDay}>
          <div className={styles.sectionHeader}>
            <h3>{dayName}</h3>
            <Button type="button" size="sm" variant="ghost" onClick={() => addRow(dayOfWeek)}>
              + Add
            </Button>
          </div>
          {items.map((item, index) =>
            item.dayOfWeek === dayOfWeek ? (
              <div key={`${dayOfWeek}-${index}`} className={styles.scheduleRow}>
                <Input
                  label="Activity"
                  value={item.title}
                  onChange={(e) => updateRow(index, { title: e.target.value })}
                />
                <Input
                  label="Subject (optional)"
                  value={item.subject}
                  onChange={(e) => updateRow(index, { subject: e.target.value })}
                />
                <Input
                  label="Time"
                  value={item.timeLabel}
                  onChange={(e) => updateRow(index, { timeLabel: e.target.value })}
                />
                <Button type="button" variant="ghost" size="sm" onClick={() => removeRow(index)}>
                  Remove
                </Button>
              </div>
            ) : null,
          )}
        </div>
      ))}
      <Button onClick={handleSave} loading={loading}>
        Save weekly schedule
      </Button>
    </div>
  );
}
