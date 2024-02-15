import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ReviewSummaryDto } from './review-summary.dto';

export class SearchResultDto {
  @ApiProperty({ type: ReviewSummaryDto })
  @Type(() => ReviewSummaryDto)
  @Expose()
  readonly list: ReviewSummaryDto[];

  @ApiProperty()
  @Expose()
  readonly count: number;
}
