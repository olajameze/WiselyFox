import { LoginFlow } from "@/features/auth/ui/LoginFlow";
import styles from "./sign-in.module.css";

export default function SignInPage() {
  return (
    <main className={styles.main}>
      <div className={styles.details}>
        <h2 className={styles.detailsTitle}>Demo Account Details</h2>
        <p>
          <strong>Parent:</strong>
          <br />
          Email: <code>parent@demo.wiselyfox.test</code>
          <br />
          Password: <code>demo123456</code>
        </p>
        <p>
          <strong>Child:</strong>
          <br />
          Access Code: <code>wfox-demo-alex</code>
          <br />
          PIN: <code>1234</code>
        </p>
        <p className={styles.adminNote}>
          <strong>Super Admin:</strong> <code>admin@wiselyfox.test</code> /{" "}
          <code>admin123456</code>
        </p>
      </div>
      <LoginFlow />
    </main>
  );
}