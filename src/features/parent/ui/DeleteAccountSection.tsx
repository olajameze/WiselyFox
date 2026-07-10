"use client";

import { useState } from "react";
import { Button, Input, Alert, Card } from "@/shared/ui";
import { deleteParentAccount } from "@/features/parent/actions/account.actions";
import styles from "./parent.module.css";

export function DeleteAccountSection({ childCount }: { childCount: number }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await deleteParentAccount({
      password,
      confirmText,
    });
    setLoading(false);
    if (!result.success) {
      setError(result.error);
    }
  }

  if (!open) {
    return (
      <Card header={<h2>Delete account</h2>} className={styles.mtLg}>
        <p className={styles.meta}>
          Permanently delete your household account, all {childCount} child
          {childCount === 1 ? "" : "ren"}&apos;s profiles, and cancel any active billing.
        </p>
        <Button variant="danger" size="sm" onClick={() => setOpen(true)}>
          Delete my account
        </Button>
      </Card>
    );
  }

  return (
    <Card header={<h2>Delete account</h2>} className={styles.mtLg}>
      <Alert variant="warning" title="This cannot be undone">
        Your account, all child profiles, learning data, and subscription will be permanently
        removed. Stripe billing will be cancelled immediately.
      </Alert>
      {error && <Alert variant="error">{error}</Alert>}
      <form className={styles.deleteForm} onSubmit={handleDelete}>
        <Input
          type="password"
          label="Confirm your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <Input
          label='Type DELETE to confirm'
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          required
          autoComplete="off"
        />
        <div className={styles.fieldRow}>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="danger"
            loading={loading}
            disabled={confirmText !== "DELETE"}
          >
            Permanently delete
          </Button>
        </div>
      </form>
    </Card>
  );
}
