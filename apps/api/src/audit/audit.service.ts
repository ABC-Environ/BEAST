import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(input: {
    actorUserId?: string;
    organizationId?: string;
    entityType: string;
    entityId: string;
    action: string;
    reason?: string;
    before?: unknown;
    after?: unknown;
  }) {
    await this.prisma.auditLog.create({ data: input });
  }
}
