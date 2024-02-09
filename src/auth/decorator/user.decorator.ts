import { ExecutionContext, ForbiddenException, InternalServerErrorException, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '@prisma/client';

export const CurrentUser = createParamDecorator((roles: Role[] = [], context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const user = ctx.getContext().req.user;

  if (!user) throw new InternalServerErrorException('No user found in request');

  if (roles.length === 0) return user;

  const hasRole = roles.some((role) => user.roles.includes(role));
  if (!hasRole) throw new ForbiddenException('You do not have permission to access this resource');

  return user;
});
