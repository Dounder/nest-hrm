import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;
}
