import { ApiProperty } from '@nestjs/swagger';
import { Max, MaxLength, Min, MinLength } from 'class-validator';
import { With } from '../enums/review-with.enum';

export class CreateReviewDto {
  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly videoToken: string;

  @ApiProperty()
  @Min(0)
  @Max(10)
  readonly stars: number;

  @ApiProperty({ enum: With, enumName: 'With', isArray: true })
  readonly with: With[];

  @ApiProperty()
  readonly tags: string[];

  @ApiProperty()
  @MinLength(0)
  @MaxLength(300)
  readonly content: string;
}
