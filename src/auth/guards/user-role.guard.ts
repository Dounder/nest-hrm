import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role, User } from '@prisma/client';
import { Observable } from 'rxjs';
import { ROLES_META } from '..';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const validRoles = this.reflector.get<Role[]>(ROLES_META, ctx.getHandler());

    if (!validRoles || validRoles.length === 0) return true;

    const user: User = ctx.getContext().req.user;

    if (!user) throw new InternalServerErrorException(`No user in request`);

    if (validRoles.some((r) => user.roles.includes(r))) return true;

    throw new ForbiddenException(`User ${user.username} need a valid role [${validRoles}]`);
  }
}
