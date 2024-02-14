import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ReviewRecommendedDto {
  @ApiProperty({ example: 0, required: false })
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => value || 0)
  @IsOptional()
  @IsNumber()
  readonly skip: number;

  @ApiProperty({ example: 10, required: false })
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => value || 10)
  @IsOptional()
  @IsNumber()
  readonly take: number;
}
