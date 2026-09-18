import { Header } from "@/shared/ui/Header/Header";
import { Footer } from "@/shared/ui/Footer/Footer";
import { TutorSignUpForm } from "@/features/tutors/ui/TutorSignUpForm";
import { TutorSocialCompleteForm } from "@/features/tutors/ui/TutorSocialCompleteForm";
import { getSessionUser } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import Link from "next/link";
import styles from "@/features/auth/ui/auth.module.css";

export default async function TutorSignUpPage() {
  const sessionUser = await getSessionUser();

  // A user who arrived via Google/Facebook sign-in has a session but no tutor
  // profile yet — show the completion step (DOB + consents) instead of the
  // full registration form.
  if (sessionUser) {
    const existingTutor = await prisma.tutorProfile.findUnique({
      where: { userId: sessionUser.id },
      select: { id: true },
    });
    if (!existingTutor) {
      return (
        <>
          <Header />
          <div className={styles.authPage}>
            <div className={styles.notebookOpen}>
              <div className={styles.bookSpine} aria-hidden="true" />
              <div className={[styles.authCard, styles.tutorSignUpCard].join(" ")}>
                <TutorSocialCompleteForm
                  name={sessionUser.name ?? "Tutor"}
                  email={sessionUser.email ?? ""}
                />
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
    }
  }

  return (
    <>
      <Header />
      <div className={styles.authPage}>
        <div className={styles.notebookOpen}>
          <div className={styles.bookSpine} aria-hidden="true" />
          <div className={[styles.authCard, styles.tutorSignUpCard].join(" ")}>
            <div className={styles.pageMeta}>
              <span>p. 1</span>
              <span>Tutor registration</span>
            </div>
            <h1 className={styles.authTitle}>Become a WiselyFox tutor</h1>
            <p className={styles.authSubtitle}>
              Join for free. Parents browse your profile and hire you; a 5% fee applies only when you get paid.
            </p>
            <TutorSignUpForm />
            <p className={styles.link}>
              Already have an account? <Link href="/tutor/sign-in">Sign in as tutor</Link>
            </p>
            <p className={styles.link}>
              <Link href="/sign-in">Sign in as parent</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
