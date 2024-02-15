import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class ListQueryDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @Min(0)
  readonly skip: number = 0;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @Max(100)
  readonly take: number = 10;
}
