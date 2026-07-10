import { requireTutorProfile } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { TutorInquiryList } from "@/features/tutors/ui/TutorInquiryList";
import { Card } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function TutorInquiriesPage() {
  const { tutor } = await requireTutorProfile();

  const inquiries = await prisma.tutorInquiry.findMany({
    where: { tutorId: tutor.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Parent inquiries</h1>
      </header>
      <Card>
        <TutorInquiryList
          inquiries={inquiries.map((i) => ({
            id: i.id,
            message: i.message,
            response: i.response,
            status: i.status,
            createdAt: i.createdAt.toISOString(),
          }))}
        />
      </Card>
    </div>
  );
}
