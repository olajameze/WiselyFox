import { redirect } from "next/navigation";

export default function LegacyLessonPage() {
  redirect("/learn/subjects");
}
