import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber } from 'class-validator';
import { UserID } from 'src/auth/entities/user.entity';

@ObjectType()
export class Users {
  @Field(() => [UserID])
  @IsArray()
  users: UserID[];

  @Field()
  @IsNumber()
  currentPage: number;

  @Field()
  @IsNumber()
  quantity: number;
}
