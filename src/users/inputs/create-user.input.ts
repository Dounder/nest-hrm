import { Field, InputType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;

  @Field(() => [Role])
  roles: Role[] = [Role.USER];
}
