import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, Max, Min } from 'class-validator';
import { With } from '../enums/review-with.enum';
import { Region } from '../enums/review-region.enum';

export class ReviewSearchDto {
  @ApiProperty({
    enum: Region,
    enumName: 'Region',
    // @ts-expect-error explode is not a valid property
    explode: false,
    isArray: true,
  })
  @Type(() => String)
  @Transform(({ value }) => [...new Set(value.split(','))])
  @IsArray()
  readonly regions: Region[];

  @ApiProperty({
    required: false,
    enum: With,
    enumName: 'With',
    // @ts-expect-error explode is not a valid property
    explode: false,
    isArray: true,
  })
  @Type(() => String)
  @Transform(({ value }) => [...new Set(value.split(','))].filter(Boolean))
  @IsArray()
  readonly withs: With[] = [];

  @ApiProperty({
    required: false,
    // @ts-expect-error explode is not a valid property
    explode: false,
  })
  @Type(() => String)
  @Transform(({ value }) => [...new Set(value.split(','))])
  @IsArray()
  readonly tags: string[] = [];

  @ApiProperty({ required: false })
  @Type(() => Number)
  @Min(0)
  readonly skip: number = 0;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @Max(100)
  readonly take: number = 10;
}
