import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma';
import { AuthResponse, LoginInput } from './';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { username, password } = loginInput;
    const user = await this.prisma.user.findFirst({ where: { username } });

    if (!user) {
      this.logger.error('User not found');
      throw new BadRequestException('Invalid credentials');
    }

    if (user.deletedAt) {
      this.logger.error('User is deleted');
      throw new BadRequestException('User is deleted, please contact the administrator');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      this.logger.error('Invalid password');
      throw new BadRequestException('Invalid credentials');
    }

    return { token: this.signToken(user.id), user };
  }

  renewToken(user: User): AuthResponse {
    return { token: this.signToken(user.id), user };
  }

  private signToken(id: number) {
    return this.jwtService.sign({ id });
  }
}
