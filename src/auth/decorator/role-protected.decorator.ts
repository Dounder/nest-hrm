import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_META = 'roles';

export const RoleProtected = (...args: Role[]) => SetMetadata(ROLES_META, args);
