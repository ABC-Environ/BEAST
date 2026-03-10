import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list(@Query('page') page = '1', @Query('pageSize') pageSize = '25') {
    const take = Number(pageSize);
    const skip = (Number(page) - 1) * take;
    return this.prisma.user.findMany({
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
