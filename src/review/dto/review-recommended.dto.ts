import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ReviewRecommendedDto {
  @ApiProperty({ required: false, description: 'default: 0' })
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => value || 0)
  @IsOptional()
  @IsNumber()
  readonly skip: number;

  @ApiProperty({ required: false, description: 'default: 10' })
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => value || 10)
  @IsOptional()
  @IsNumber()
  readonly take: number;
}
