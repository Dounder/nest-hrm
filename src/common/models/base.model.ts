import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class BaseModel {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  @Field(() => Date, { nullable: true })
  deletedAt: Date | null;

  @Field(() => Boolean)
  deleted: boolean;
}
