"use client";

import { signOutUser } from "@/features/auth/actions/session.actions";
import { DashboardAccountMenu } from "@/shared/ui/DashboardAccountMenu/DashboardAccountMenu";

export function ChildAccountMenu() {
  return (
    <DashboardAccountMenu
      label="Account"
      variant="inline"
      actions={[{ label: "Sign out", formAction: signOutUser, variant: "danger" }]}
    />
  );
}
