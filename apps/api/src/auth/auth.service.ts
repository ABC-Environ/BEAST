import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, orgId: user.organizationId, roleId: user.roleId };
    return {
      accessToken: await this.jwt.signAsync(payload),
      refreshToken: await this.jwt.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'dev_refresh',
        expiresIn: Number(process.env.JWT_REFRESH_TTL || 2592000),
      }),
    };
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwt.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET || 'dev_refresh',
    });

    return {
      accessToken: await this.jwt.signAsync({ sub: payload.sub, orgId: payload.orgId, roleId: payload.roleId }),
      refreshToken,
    };
  }
}
