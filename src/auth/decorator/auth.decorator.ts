import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard, ROLES_META, UserRoleGuard } from '..';

export function Auth(...roles: Role[]) {
  return applyDecorators(SetMetadata(ROLES_META, roles), UseGuards(JwtAuthGuard, UserRoleGuard));
}
