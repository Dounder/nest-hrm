import { Controller, Post, Body, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { Auth, CurrentUser } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('renew_token')
  renewToken(@CurrentUser() user: User) {
    return this.authService.renewToken(user);
  }
}
