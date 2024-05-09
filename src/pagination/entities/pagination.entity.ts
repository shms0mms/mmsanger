import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@ObjectType()
export class Pagination {
  @Field()
  @IsNumber()
  @IsOptional()
  currentPage?: number;

  @Field()
  @IsNumber()
  @IsOptional()
  take?: number;
}
