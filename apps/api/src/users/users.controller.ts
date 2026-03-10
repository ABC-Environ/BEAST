import { Controller, Get, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../database/prisma.service';

type AuthenticatedRequest = {
  user?: {
    orgId?: string;
  };
};

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
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
    return this.prisma.user.findMany({
      where: { organizationId },
      take,
      skip,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        externalId: true,
        organizationId: true,
        branchId: true,
        roleId: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
