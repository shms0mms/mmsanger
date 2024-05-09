import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber } from 'class-validator';
import { UserID } from 'src/auth/entities/user.entity';

@ObjectType()
export class History {
  @Field(() => ID)
  @IsNumber()
  id: number;
  @Field(() => ID)
  @IsNumber()
  userId: number;
  @Field(() => [UserID])
  @IsArray()
  users: UserID[];
}
