import { ParentShell } from "@/features/parent/ui/ParentShell";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <ParentShell>{children}</ParentShell>;
}
