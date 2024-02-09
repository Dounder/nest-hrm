import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from 'src/prisma';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule {}
