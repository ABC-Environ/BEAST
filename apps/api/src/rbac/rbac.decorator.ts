import { SetMetadata } from '@nestjs/common';

export const RBAC_PERMS_KEY = 'rbac_perms';
export const RequirePermissions = (...permissions: string[]) => SetMetadata(RBAC_PERMS_KEY, permissions);
