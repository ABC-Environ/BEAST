import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RBAC_PERMS_KEY } from './rbac.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(RBAC_PERMS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const userPerms: string[] = req.user?.permissions || [];
    const ok = required.every((p) => userPerms.includes(p));
    if (!ok) throw new ForbiddenException('Missing permission');
    return true;
  }
}
