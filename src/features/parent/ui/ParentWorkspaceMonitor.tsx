"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui";
import { flagAssignmentForAdmin } from "@/features/tutors/actions/lesson-assignment.actions";
import styles from "./parent.module.css";

type Assignment = {
  id: string;
  lessonTitle: string;
  tutorNotes: string;
  status: string;
  isFlaggedByParent: boolean;
  tutorName: string | null;
  createdAt: string;
};

export function ParentWorkspaceMonitor({
  assignments,
  childName,
}: {
  assignments: Assignment[];
  childName: string;
}) {
  const router = useRouter();
  const [flaggingId, setFlaggingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleFlag(assignmentId: string) {
    setFlaggingId(assignmentId);
    setError("");
    const result = await flagAssignmentForAdmin(assignmentId);
    setFlaggingId(null);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  if (assignments.length === 0) {
    return (
      <div className={styles.meta}>
        No tutor assignments for {childName} yet.
      </div>
    );
  }

  return (
    <div className={styles.childList}>
      {error && <p className={styles.meta}>{error}</p>}
      {assignments.map((a) => (
        <div key={a.id} className={styles.childItem}>
          <div>
            <strong>{a.lessonTitle}</strong>
            <div className={styles.meta}>
              Tutor: {a.tutorName ?? "Assigned"} · {a.status.toLowerCase().replace("_", " ")}
            </div>
            {a.tutorNotes && (
              <p className={styles.meta}>{a.tutorNotes}</p>
            )}
            {a.isFlaggedByParent && (
              <p className={styles.meta}>Flagged for admin review</p>
            )}
          </div>
          <div className={styles.childActions}>
            <Button
              size="sm"
              variant="secondary"
              loading={flaggingId === a.id}
              disabled={a.isFlaggedByParent}
              onClick={() => handleFlag(a.id)}
            >
              {a.isFlaggedByParent ? "Flagged" : "Flag note for admin review"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
