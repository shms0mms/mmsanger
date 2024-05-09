import { Field, ID, InputType, OmitType, PickType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import {
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_USERNAME,
} from 'src/constants/errors.contsants';
import { EnumStatus } from '../entities/user.entity';
@InputType()
export class UserImageInput {
  @Field()
  @IsString()
  imageURL: string;
}
@InputType()
export class UserInput extends UserImageInput {
  @Field()
  @IsString()
  firstName: string;
  @Field()
  @IsString()
  secondName: string;
  @Field()
  @MinLength(8, {
    message: MIN_LENGTH_USERNAME,
  })
  username: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsEnum(EnumStatus)
  status: EnumStatus;
  @Field()
  @IsString()
  description: string;
}

@InputType()
export class UserIDInput extends UserInput {
  @Field(() => ID)
  id: number;
}

@InputType()
export class UserDBInput extends UserIDInput {
  @Field()
  @MinLength(8, { message: MIN_LENGTH_PASSWORD })
  password: string;
}

@InputType()
export class UserLoginInput extends PickType(UserDBInput, [
  'email',
  'password',
  'username',
] as const) {}
@InputType()
export class UserCreateInput extends OmitType(UserDBInput, [
  'id',
  'status',
  'imageURL',
  'description',
] as const) {}

@InputType()
export class UserUpdateInput extends OmitType(UserDBInput, [
  'status',
  'id',
  'imageURL',
  'password',
] as const) {}
