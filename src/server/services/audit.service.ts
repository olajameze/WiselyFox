import { prisma } from "@/shared/lib/prisma";

export async function logAudit(params: {
  actorId?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipHash?: string;
}) {
  return prisma.auditLog.create({
    data: {
      actorId: params.actorId,
      action: params.action,
      resource: params.resource,
      resourceId: params.resourceId,
      metadata: params.metadata ? JSON.stringify(params.metadata) : null,
      ipHash: params.ipHash,
    },
  });
}
