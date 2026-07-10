"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { confirmTutorBooking } from "@/features/tutors/actions/tutor-booking.actions";
import { TutorFeeDisclosure } from "./TutorFeeDisclosure";
import { Button, Alert } from "@/shared/ui";
import styles from "./tutor.module.css";

type Props = {
  tutorId: string;
  hourlyRatePence: number;
  acceptsDeposits: boolean;
  depositPercent: number | null;
  householdChildren: { id: string; displayName: string }[];
};

export function TutorBookingForm({
  tutorId,
  hourlyRatePence,
  acceptsDeposits,
  depositPercent,
  householdChildren,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [feeAccepted, setFeeAccepted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const hours = Number(fd.get("hours") ?? 1);
    const amountPence = Math.round(hours * hourlyRatePence);
    const useDeposit = fd.get("useDeposit") === "on" && acceptsDeposits;
    const depositPence = useDeposit
      ? Math.round(amountPence * ((depositPercent ?? 25) / 100))
      : undefined;

    const result = await confirmTutorBooking({
      tutorId,
      childId: String(fd.get("childId") ?? "") || undefined,
      amountPence,
      depositPence,
      autoShareProgress: fd.get("autoShareProgress") === "on",
      learnerAlias: String(fd.get("learnerAlias") ?? "") || undefined,
      notes: String(fd.get("notes") ?? "") || undefined,
    });
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.refresh();
    if (result.data.clientSecret) {
      alert("Booking confirmed. Complete payment in Stripe when checkout is wired.");
    } else {
      alert("Booking confirmed.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <Alert variant="error">{error}</Alert>}
      <div className={styles.field}>
        <label htmlFor="hours">Session length (hours)</label>
        <input id="hours" name="hours" type="number" min={0.5} max={8} step={0.5} defaultValue={1} />
      </div>
      {householdChildren.length > 0 && (
        <div className={styles.field}>
          <label htmlFor="childId">Child (optional)</label>
          <select id="childId" name="childId">
            <option value="">No child linked</option>
            {householdChildren.map((c) => (
              <option key={c.id} value={c.id}>
                {c.displayName}
              </option>
            ))}
          </select>
        </div>
      )}
      <label className={styles.checkboxRow}>
        <input type="checkbox" name="autoShareProgress" defaultChecked />
        <span>Share learning progress with this tutor after booking</span>
      </label>
      <div className={styles.field}>
        <label htmlFor="learnerAlias">Learner alias (if sharing progress)</label>
        <input id="learnerAlias" name="learnerAlias" placeholder="e.g. Learner A" />
      </div>
      {acceptsDeposits && (
        <label className={styles.checkboxRow}>
          <input type="checkbox" name="useDeposit" />
          <span>Pay deposit only ({depositPercent ?? 25}%)</span>
        </label>
      )}
      <div className={styles.field}>
        <label htmlFor="notes">Notes (optional)</label>
        <textarea id="notes" name="notes" rows={2} maxLength={500} />
      </div>
      <TutorFeeDisclosure
        feeAccepted={feeAccepted}
        onFeeAcceptedChange={setFeeAccepted}
        id="booking-fee"
      />
      <p className={styles.meta}>
        Rate: £{(hourlyRatePence / 100).toFixed(2)}/hr · Platform fee: 5%
      </p>
      <Button type="submit" disabled={loading || !feeAccepted}>
        {loading ? "Confirming…" : "Confirm booking"}
      </Button>
    </form>
  );
}
