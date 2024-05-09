import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';
import { UserID } from 'src/auth/entities/user.entity';

@ObjectType()
export class Message {
  @Field()
  @IsString()
  message: string;

  @Field(() => String)
  @IsUUID()
  chatId: string;

  @Field(() => ID)
  @IsNumber()
  userId: number;

  @Field(() => ID)
  @IsNumber()
  id: number;

  @Field(() => UserID)
  user: UserID;

  @Field()
  @IsDateString()
  createdAt: Date;
}
