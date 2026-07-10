import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ tutorId: string }>;
};

export default async function ParentTutorProfileRedirect({ params }: Props) {
  const { tutorId } = await params;
  redirect(`/tutors/${tutorId}`);
}
