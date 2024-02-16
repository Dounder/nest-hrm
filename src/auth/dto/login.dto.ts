import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginDto {
  @Field(() => String)
  @IsNotEmpty()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;
}
