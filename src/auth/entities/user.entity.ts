/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import {
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_USERNAME,
} from 'src/constants/errors.contsants';
@ObjectType()
export class UserImage {
  @Field()
  @IsString()
  imageURL: string;
}

export enum EnumStatus {
  offline = 'offline',
  online = 'online',
}
@ObjectType()
export class User extends UserImage {
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
  @IsString()
  description: string;
  @Field()
  @IsEnum(EnumStatus)
  status: EnumStatus;
}

@ObjectType()
export class UserUpdate extends OmitType(User, ['status'] as const) {}

@ObjectType()
export class UserDB extends User {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @MinLength(8, {
    message: MIN_LENGTH_PASSWORD,
  })
  password: string;
}

@ObjectType()
export class UserID extends OmitType(UserDB, ['password'] as const) {}

@ObjectType()
export class UserAuth2 extends UserID {
  @Field()
  @IsString()
  accessToken: string;
  @Field()
  @IsString()
  refreshToken: string;
}

@ObjectType()
export class UserTokens extends PickType(UserAuth2, [
  'accessToken',
  'refreshToken',
] as const) {}
@ObjectType()
export class UserAuth extends UserID {
  @Field()
  @IsString()
  accessToken: string;
  @Field()
  @IsString()
  refreshToken: string;
}
