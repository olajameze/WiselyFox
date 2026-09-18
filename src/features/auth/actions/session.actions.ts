"use server";

import { signOut } from "@/features/auth/auth";

export async function signOutUser() {
  await signOut({ redirectTo: "/login" });
}

export async function signOutToSignIn() {
  await signOut({ redirectTo: "/sign-in" });
}

export async function signOutToChildSignIn() {
  await signOut({ redirectTo: "/child-sign-in" });
}
