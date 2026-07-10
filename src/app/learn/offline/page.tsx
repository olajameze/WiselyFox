import Link from "next/link";
import { Alert, Button, Card } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default function LearnOfflinePage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <h1>Offline learning</h1>
        <p className={styles.pageSubtitle}>
          WiselyFox works without the internet when installed as an app. Here is what you can do offline.
        </p>
      </header>

      <Alert variant="info" title="Install the app for best offline use">
        Add WiselyFox to your home screen from your browser menu. Pages you have opened before stay available
        offline.
      </Alert>

      <Card className={styles.cardSpaced}>
        <h2>Works offline</h2>
        <ul>
          <li>Pages you recently visited (home, subjects, lessons in progress)</li>
          <li>Focus timer and lesson steps already loaded</li>
          <li>Your accessibility settings</li>
        </ul>
      </Card>

      <Card className={styles.cardSpaced}>
        <h2>Needs internet (or print first)</h2>
        <ul>
          <li>New quizzes and saving scores</li>
          <li>Syncing progress and XP</li>
          <li>Parent notifications and certificates</li>
        </ul>
        <p className={styles.meta}>
          Tip: ask a parent to print worksheets from their dashboard, then you can practise on paper with no
          device at all.
        </p>
      </Card>

      <Link href="/learn">
        <Button size="sm">Back to learn home</Button>
      </Link>
    </>
  );
}
