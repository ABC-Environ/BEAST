import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { JobStatus } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { canTransition } from './job-fsm';
import { BadRequestException } from '@nestjs/common';

@Controller('jobs')
export class JobsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(@Query('page') page = '1', @Query('pageSize') pageSize = '25') {
    const take = Number(pageSize);
    const skip = (Number(page) - 1) * take;
    return this.prisma.job.findMany({ take, skip, orderBy: { createdAt: 'desc' } });
  }

  @Post(':id/transition')
  async transition(@Param('id') id: string, @Body() body: { to: JobStatus }) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new BadRequestException('Job not found');
    if (!canTransition(job.status, body.to)) throw new BadRequestException('Invalid transition');
    return this.prisma.job.update({ where: { id }, data: { status: body.to } });
  }
}
