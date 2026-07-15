import { unstable_cache } from "next/cache";
import { prisma } from "@/shared/lib/prisma";

export const getPublishedSubjects = unstable_cache(
  async () =>
    prisma.subject.findMany({
      where: { published: true },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        ageBands: true,
        _count: { select: { lessons: true } },
      },
      orderBy: { title: "asc" },
    }),
  ["published-subjects"],
  { revalidate: 30 },
);

export function getSubjectWithLessons(slug: string) {
  return unstable_cache(
    async () =>
      prisma.subject.findUnique({
        where: { slug },
        include: {
          lessons: { where: { published: true }, orderBy: { difficulty: "asc" } },
        },
      }),
    [`subject-lessons-${slug}`],
    { revalidate: 120 },
  )();
}
