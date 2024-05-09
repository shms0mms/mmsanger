import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ObjectType()
export class Delete {
  @Field(() => ID)
  @IsNumber()
  chatId: number;
}
