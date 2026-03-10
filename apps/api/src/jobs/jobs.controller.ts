import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JobStatus } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { canTransition } from './job-fsm';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

type AuthenticatedRequest = {
  user?: {
    orgId?: string;
  };
};

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(@Req() req: AuthenticatedRequest, @Query('page') page = '1', @Query('pageSize') pageSize = '25') {
    const organizationId = req.user?.orgId;
    if (!organizationId) throw new UnauthorizedException('Missing organization context');

    const take = Number(pageSize);
    const skip = (Number(page) - 1) * take;
    return this.prisma.job.findMany({
      where: { organizationId },
      take,
      skip,
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post(':id/transition')
  async transition(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: { to: JobStatus }) {
    const organizationId = req.user?.orgId;
    if (!organizationId) throw new UnauthorizedException('Missing organization context');

    const job = await this.prisma.job.findFirst({ where: { id, organizationId } });
    if (!job) throw new BadRequestException('Job not found');
    if (!canTransition(job.status, body.to)) throw new BadRequestException('Invalid transition');

    await this.prisma.job.updateMany({
      where: { id, organizationId },
      data: { status: body.to },
    });

    return this.prisma.job.findFirst({ where: { id, organizationId } });
  }
}
