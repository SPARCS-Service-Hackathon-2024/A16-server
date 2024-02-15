import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class ReviewSummaryDto implements Review {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @Exclude()
  userId: string;

  @ApiProperty()
  @Expose()
  stars: number;

  @ApiProperty()
  @Expose()
  content: string;

  @Exclude()
  placeId: string;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;
}
