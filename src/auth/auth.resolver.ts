import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { AuthResponse, AuthService, CurrentUser, JwtAuthGuard, LoginInput } from '.';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'login' })
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'renewToken' })
  @UseGuards(JwtAuthGuard)
  renewToken(@CurrentUser() user: User) {
    return this.authService.renewToken(user);
  }
}
