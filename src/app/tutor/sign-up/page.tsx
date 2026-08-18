import { TutorSignUpForm } from "@/features/tutors/ui/TutorSignUpForm";
import styles from "@/features/auth/ui/auth.module.css";

/**
 * The public-facing page for new users to sign up as tutors.
 */
export default function TutorSignUpPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.notebookOpen}>
        <div className={styles.bookSpine} aria-hidden="true" />
        <TutorSignUpForm />
      </div>
    </div>
  );
}
