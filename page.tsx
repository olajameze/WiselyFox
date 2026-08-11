import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

// This line prevents Next.js from trying to fetch data at build time.
export const dynamic = "force-dynamic";

export default async function TutorsPage() {
  // This database call will now only run when a user visits the page.
  const tutors = await db.tutorProfile.findMany({
    where: { published: true },
  });

  return (
    <div>
      <h1>Our Tutors ({tutors.length})</h1>
      {/* You can add the UI to display the list of tutors here */}
    </div>
  );
}