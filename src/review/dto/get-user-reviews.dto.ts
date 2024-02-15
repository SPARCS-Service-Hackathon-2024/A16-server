import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class GetUserReviewsDto {
  @ApiProperty({ required: false })
  @Min(0)
  readonly skip: number = 0;

  @ApiProperty({ required: false })
  @Max(100)
  readonly take: number = 10;
}
