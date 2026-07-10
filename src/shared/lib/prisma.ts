import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const REQUIRED_DELEGATES = [
  "user",
  "childProfile",
  "learningScheduleItem",
  "lessonCompletion",
  "tutorProfile",
] as const;

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function hasDelegate(client: PrismaClient, key: (typeof REQUIRED_DELEGATES)[number]): boolean {
  const delegate = client[key as keyof PrismaClient];
  return (
    delegate !== undefined &&
    delegate !== null &&
    typeof delegate === "object" &&
    "findMany" in (delegate as object)
  );
}

function isStaleClient(client: PrismaClient): boolean {
  return REQUIRED_DELEGATES.some((key) => !hasDelegate(client, key));
}

export function getPrismaClient(): PrismaClient {
  const existing = globalForPrisma.prisma;

  if (existing && !isStaleClient(existing)) {
    return existing;
  }

  if (existing) {
    void existing.$disconnect().catch(() => {});
  }

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

/** Lazy proxy so dev hot reload picks up regenerated Prisma delegates without a full restart */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
