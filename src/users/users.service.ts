import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma';
import { CreateUserInput, UpdateUserInput } from './inputs';

interface FindOneProps {
  id: number;
  deleted?: boolean;
  password?: boolean;
}
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const password = bcrypt.hashSync(createUserInput.password, 10);

    return await this.prisma.user.create({
      data: { ...createUserInput, password },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(props: FindOneProps) {
    const { id, deleted: withDeleted = false, password: withPwd = false } = props;
    const user = await this.prisma.user.findUnique({ where: { id } });
    return this.validateUser(user, withDeleted, withPwd);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return await this.prisma.user.update({ where: { id }, data: updateUserInput });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }

  private async validateUser(user: User, withDeleted: boolean = false, withPwd: boolean = false) {
    // If user is not found, throw an exception
    if (!user) throw new NotFoundException('User not found');

    // If user is deleted and withDeleted is false, throw an exception
    if (!withDeleted && user.deletedAt) throw new NotFoundException('User is deleted, please contact the administrator');

    if (!withPwd) return this.excludeKeys(user, ['password']);

    return user;
  }

  // exclude keys from the user object
  private excludeKeys(user: User, keys: string[]) {
    const newUser = { ...user };
    keys.forEach((key) => delete newUser[key]);
    return newUser;
  }
}
