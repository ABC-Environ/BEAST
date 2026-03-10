import { Controller, Get, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../database/prisma.service';

type AuthenticatedRequest = {
  user?: {
    orgId?: string;
  };
};

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(
    @Req() req: AuthenticatedRequest,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '25',
  ) {
    const organizationId = req.user?.orgId;
    if (!organizationId) throw new UnauthorizedException('Missing organization context');

    const take = Number(pageSize);
    const skip = (Number(page) - 1) * take;
    return this.prisma.customer.findMany({
      where: { organizationId },
      take,
      skip,
      orderBy: { createdAt: 'desc' },
    });
  }
}
