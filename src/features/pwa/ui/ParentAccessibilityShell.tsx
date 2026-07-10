import { DashboardAccessibilityToolbar } from "@/shared/ui/DashboardAccessibilityToolbar/DashboardAccessibilityToolbar";

export function ParentAccessibilityShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardAccessibilityToolbar hint="Adjust how the parent dashboard looks on this device. Child learning uses separate settings you manage per child." />
      {children}
    </>
  );
}
