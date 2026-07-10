"use client";

import { signOutToSignIn } from "@/features/auth/actions/session.actions";
import { DashboardAccountMenu } from "@/shared/ui/DashboardAccountMenu/DashboardAccountMenu";

export function TutorAccountMenu() {
  return (
    <DashboardAccountMenu
      actions={[{ label: "Sign out", formAction: signOutToSignIn, variant: "danger" }]}
    />
  );
}
