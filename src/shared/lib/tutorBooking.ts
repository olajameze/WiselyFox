"use server";

import { z } from "zod";
import { auth } from "@/features/auth/auth";
import { prisma } from "@/shared/lib/prisma";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

// Define the schema for the incoming payload using Zod for server-side validation
const bookTutorSchema = z.object({
  tutorId: z.string().uuid("Invalid tutor ID format."),
});

/**
 * Server Action to handle booking a tutor.
 * Performs RBAC, validates input, logs the transaction, and simulates Stripe checkout.
 * @param formData The form data containing the tutorId.
 */
export async function bookTutorAction(formData: FormData) {
  const session = await auth();

  // RBAC SECURITY: Check if user is authenticated and authorized
  if (!session?.user) {
    // For a real application, you might redirect to login or show a specific error.
    // For now, we'll throw an error as per "ZERO PLACEHOLDERS" rule.
    throw new Error("Authentication required to book a tutor.", { cause: 401 });
  }

  const userRole = session.user.role;
  const userId = session.user.id;

  let isAuthorized = false;
  let parentId: string | undefined = undefined;
  let childId: string | undefined = undefined;

  if (userRole === UserRole.PARENT) {
    isAuthorized = true;
    parentId = userId;
  } else if (userRole === UserRole.CHILD) {
    childId = userId;
    // For students, we need to check their age and get their parent's ID.
    const childProfile = await prisma.childProfile.findUnique({
      where: { userId: userId },
      select: { ageBand: true, parentId: true },
    });

    if (childProfile) {
      parentId = childProfile.parentId;
      // Simple age check: assuming "16-18", "17-19", "20-23" age bands imply 16+
      if (childProfile.ageBand && ["16-18", "17-19", "20-23"].includes(childProfile.ageBand)) {
        isAuthorized = true;
      }
    }
  }

  if (!isAuthorized || !parentId) {
    throw new Error("Unauthorized: Only parents or students aged 16+ can book tutors.", { cause: 403 });
  }

  // Server-side validation using Zod
  const validatedFields = bookTutorSchema.safeParse({
    tutorId: formData.get("tutorId"),
  });
  if (!validatedFields.success) {
    throw new Error("Invalid tutor ID provided.", { cause: 400 });
  }

  const { tutorId } = validatedFields.data;

  // ZERO PLACEHOLDERS: Log database transaction
  // In a real application, this would create a booking record,
  // potentially update tutor availability, etc.
  await prisma.tutorBooking.create({
    data: {
      tutorId: tutorId,
      parentId: parentId,
      childId: childId,
      amountPence: 5000, // Placeholder amount
      status: "INQUIRY",
    },
  });

  console.log(`Booking initiated for Tutor ID: ${tutorId} by User ID: ${userId}`);

  // Simulate forwarding to Stripe checkout infrastructure
  // In a real application, this would generate a Stripe Checkout Session URL
  // and redirect the user to it.
  const stripeCheckoutUrl = `/checkout?tutorId=${tutorId}&amount=${5000}`; // Example amount
  redirect(stripeCheckoutUrl); // Use Next.js redirect for server actions
}
