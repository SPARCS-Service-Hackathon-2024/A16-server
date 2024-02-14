import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { With } from '../enums/review-with.enum';

enum Region {
  서구 = '서구',
  중구 = '중구',
  유성구 = '유성구',
  대덕구 = '대덕구',
  동구 = '동구',
}

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
  readonly region: Region[];

  @ApiProperty({ required: false, enum: With, enumName: 'With' })
  readonly with?: With;

  @ApiProperty({
    required: false,
    // @ts-expect-error explode is not a valid property
    explode: false,
  })
  @Type(() => String)
  @Transform(({ value }) => [...new Set(value.split(','))])
  @IsArray()
  readonly tags: string[] = [];
}
