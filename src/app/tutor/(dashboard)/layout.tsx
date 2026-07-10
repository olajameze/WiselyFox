import { TutorShell } from "@/features/tutors/ui/TutorShell";

export default function TutorDashboardLayout({ children }: { children: React.ReactNode }) {
  return <TutorShell>{children}</TutorShell>;
}
