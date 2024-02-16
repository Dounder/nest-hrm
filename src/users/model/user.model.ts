import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { BaseModel } from '../../common';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  password: string;

  @Field(() => [Role])
  roles: Role[] = [Role.USER];

  @Field(() => User, { nullable: true })
  lastUpdatedBy?: User;
}
