import { Message } from './message.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsDateString, IsOptional, IsUUID } from 'class-validator';
import { UserID } from 'src/auth/entities/user.entity';

@ObjectType()
export class Chat {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => [Message])
  @IsArray()
  messages: Message[];

  @Field(() => [UserID])
  @IsArray()
  users: UserID[];

  @Field(() => Date)
  @IsDateString()
  createdAt: Date;

  @Field(() => String || null, { nullable: true })
  @IsOptional()
  chatName?: string;
}
