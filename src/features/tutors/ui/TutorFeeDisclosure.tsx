import { TUTOR_FEE_COPY } from "@/features/tutors/lib/tutor-consent";
import styles from "./tutor.module.css";

type Props = {
  feeAccepted: boolean;
  onFeeAcceptedChange: (value: boolean) => void;
  id?: string;
};

export function TutorFeeDisclosure({ feeAccepted, onFeeAcceptedChange, id = "fee-accepted" }: Props) {
  return (
    <div className={styles.feeBox}>
      <h3>{TUTOR_FEE_COPY.title}</h3>
      <p>{TUTOR_FEE_COPY.body}</p>
      <p>
        <strong>{TUTOR_FEE_COPY.example}</strong>
      </p>
      <label className={styles.checkboxRow} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={feeAccepted}
          onChange={(e) => onFeeAcceptedChange(e.target.checked)}
          required
        />
        <span>I understand and accept the 5% platform fee on all payments and deposits.</span>
      </label>
    </div>
  );
}
