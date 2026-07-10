import Link from "next/link";
import styles from "./SkipLink.module.css";

export function SkipLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={styles.skipLink}>
      {children}
    </Link>
  );
}
