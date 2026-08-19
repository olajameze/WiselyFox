import Link from "next/link";
import { requireParentOwner } from "@/shared/lib/permissions";
import { getPublishedTutors, parseJsonArray } from "@/features/tutors/services/tutor-profile.service";
import { Card, Button, Badge } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ParentTutorsPage() {
  await requireParentOwner();
  const tutors = await getPublishedTutors();

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Find Tutors</h1>
        <p className={styles.pageSubtitle}>
          Connect with verified 1-on-1 educators and share progress securely with learner aliases.
        </p>
      </header>

      {tutors.length === 0 ? (
        <Card>
          <p className={styles.empty}>
            No verified tutors currently available. Please check back soon or invite a tutor to apply.
          </p>
        </Card>
      ) : (
        <div className={styles.childList}>
          {tutors.map((tutor) => {
            const subjects = parseJsonArray(tutor.subjects);
            const ageBands = parseJsonArray(tutor.ageBands);
            const rateFormatted = (tutor.hourlyRatePence / 100).toFixed(2);

            return (
              <Card key={tutor.id} className={styles.childCard}>
                <div className={styles.childCardHeader}>
                  <div>
                    <h2>{tutor.user.name ?? "Verified Tutor"}</h2>
                    <p className={styles.meta}>{tutor.headline || "Dedicated Educator"}</p>
                  </div>
                  <Badge variant="success">Verified</Badge>
                </div>

                <p style={{ margin: "0.5rem 0", fontSize: "0.9375rem", lineHeight: "1.5" }}>
                  {tutor.bio || tutor.experienceSummary || "Experienced subject tutor ready to support your child's learning journey."}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "0.5rem 0" }}>
                  {subjects.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                  {ageBands.map((a) => (
                    <Badge key={a} variant="warning">Ages {a}</Badge>
                  ))}
                </div>

                <p className={styles.meta} style={{ fontWeight: 600 }}>
                  Hourly Rate: £{rateFormatted}/hr {tutor.acceptsDeposits ? "• Accepts Session Deposits" : ""}
                </p>

                <div className={styles.childActions} style={{ marginTop: "1rem" }}>
                  <Link href={`/parent/tutors/${tutor.id}`}>
                    <Button size="sm">
                      View Profile &amp; Hire
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
