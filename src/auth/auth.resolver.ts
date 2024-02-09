import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { Auth, AuthResponse, AuthService, CurrentUser, LoginInput } from '.';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'login' })
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'renewToken' })
  @Auth()
  renewToken(@CurrentUser() user: User) {
    return this.authService.renewToken(user);
  }
}
