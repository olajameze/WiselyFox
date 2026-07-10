"use client";

import {
  signOutUser,
  signOutToSignIn,
  signOutToChildSignIn,
} from "@/features/auth/actions/session.actions";
import { DashboardAccountMenu } from "@/shared/ui/DashboardAccountMenu/DashboardAccountMenu";

export function AccountMenu() {
  return (
    <DashboardAccountMenu
      actions={[
        { label: "Sign out", formAction: signOutUser, variant: "danger" },
        { label: "Switch to child", formAction: signOutToChildSignIn },
        { label: "Switch account", formAction: signOutToSignIn },
      ]}
    />
  );
}
