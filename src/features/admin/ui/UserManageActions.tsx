"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Input, Alert } from "@/shared/ui";
import { adminDeleteUser, adminUpdateUserRole } from "@/features/admin/actions/admin.actions";
import { UserRole } from "@prisma/client";
import styles from "./admin.module.css";

const MANAGEABLE_ROLES = [UserRole.PARENT, UserRole.ADMIN, UserRole.SUPERADMIN] as const;
type ManageableRole = (typeof MANAGEABLE_ROLES)[number];

function isManageableRole(role: UserRole): role is ManageableRole {
  return (MANAGEABLE_ROLES as readonly UserRole[]).includes(role);
}

interface UserManageActionsProps {
  userId: string;
  confirmLabel: string;
  role: UserRole;
  isSelf: boolean;
}

export function UserManageActions({
  userId,
  confirmLabel,
  role,
  isSelf,
}: UserManageActionsProps) {
  const router = useRouter();
  const [roleValue, setRoleValue] = useState<ManageableRole>(
    isManageableRole(role) ? role : UserRole.PARENT,
  );
  const [confirmText, setConfirmText] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<"role" | "delete" | null>(null);

  const canManageRole = role !== UserRole.CHILD;

  async function handleRoleChange(nextRole: ManageableRole) {
    setRoleValue(nextRole);
    setError("");
    setLoading("role");
    const result = await adminUpdateUserRole({ userId, role: nextRole });
    setLoading(null);
    if (!result.success) {
      setError(result.error);
      setRoleValue(isManageableRole(role) ? role : UserRole.PARENT);
      return;
    }
    router.refresh();
  }

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading("delete");
    const result = await adminDeleteUser({ userId, confirmText });
    setLoading(null);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setShowDelete(false);
    setConfirmText("");
    router.refresh();
  }

  if (isSelf) {
    return <span className={styles.meta}>Your account</span>;
  }

  return (
    <div className={styles.userManage}>
      {error && <Alert variant="error">{error}</Alert>}

      {canManageRole && (
        <label className={styles.roleSelect}>
          <span className="sr-only">Change role</span>
          <select
            value={roleValue}
            disabled={loading === "role"}
            onChange={(e) => void handleRoleChange(e.target.value as ManageableRole)}
          >
            {MANAGEABLE_ROLES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      )}

      {!showDelete ? (
        <Button size="sm" variant="danger" onClick={() => setShowDelete(true)}>
          Delete
        </Button>
      ) : (
        <form className={styles.deleteUserForm} onSubmit={handleDelete}>
          <Input
            label={`Type ${confirmLabel} to confirm`}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            required
            autoComplete="off"
          />
          <div className={styles.rowActions}>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                setShowDelete(false);
                setConfirmText("");
                setError("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              variant="danger"
              loading={loading === "delete"}
              disabled={confirmText.toLowerCase() !== confirmLabel.toLowerCase()}
            >
              Delete account
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
