"use server";

import { z } from "zod";
import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";

// Define the schema for the incoming payload using Zod for server-side validation
const bookTutorSchema = z.object({
  tutorId: z.string().min(1, "Invalid tutor ID format."),
});

/**
 * Server Action to handle booking a tutor.
 * Redirects unauthenticated users to sign in, or sends users to the tutor's hire panel.
 * @param formData The form data containing the tutorId.
 */
export async function bookTutorAction(formData: FormData) {
  const session = await auth();
  const rawTutorId = formData.get("tutorId");
  const validatedFields = bookTutorSchema.safeParse({
    tutorId: rawTutorId,
  });

  const tutorId = validatedFields.success ? validatedFields.data.tutorId : "";

  // RBAC SECURITY: Check if user is authenticated and authorized
  if (!session?.user) {
    if (tutorId) {
      redirect(`/sign-in?callbackUrl=/tutors/${tutorId}`);
    }
    redirect("/sign-in");
  }

  if (tutorId) {
    redirect(`/tutors/${tutorId}`);
  }
  redirect("/tutors");
}
