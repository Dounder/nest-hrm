import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from 'src/prisma';
import { UsersModule } from 'src/users';
import { AuthResolver } from './auth.resolver';
import { AuthService, JwtStrategy } from '.';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '4h' },
      }),
    }),

    PrismaModule,

    UsersModule,
  ],
})
export class AuthModule {}
