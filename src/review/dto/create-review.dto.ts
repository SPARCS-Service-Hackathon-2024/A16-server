import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { With } from '../enums/review-with.enum';

export class CreateReviewDto {
  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly videoToken: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(5)
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
