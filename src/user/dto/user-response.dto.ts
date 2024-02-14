import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { FollowingDto } from './following.dto';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  readonly email: string;

  @ApiProperty()
  @Expose()
  readonly nickname: string;

  @ApiProperty({ required: false })
  @Expose()
  readonly bio?: string;

  @ApiProperty()
  @Transform(({ obj }) => {
    const reviews = obj.reviews as Prisma.ReviewGetPayload<{
      include: { tags: true };
    }>[];
    const tagCounts = reviews
      .flatMap((review) => review.tags.map((tag) => tag.name))
      .reduce(
        (acc, tag) => ({ ...acc, [tag]: (acc[tag] || 0) + 1 }),
        {} as Record<string, number>,
      );
    const tags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([tag]) => tag);
    return tags.slice(0, 3);
  })
  @Expose()
  readonly tags: string[];

  @Exclude()
  readonly createdAt: Date;

  @Exclude()
  readonly provider: string;

  @ApiProperty({ type: Number })
  @Type(() => FollowingDto)
  @Transform(({ value }) => value.length, { toPlainOnly: true })
  @Expose()
  readonly followings: FollowingDto[];

  @ApiProperty({ type: Number })
  @Type(() => FollowingDto)
  @Transform(({ value }) => value.length, { toPlainOnly: true })
  @Expose()
  readonly followers: FollowingDto[];

  @ApiProperty()
  @Expose()
  readonly isFollowing: boolean;

  @Exclude({ toPlainOnly: true })
  reviews: never[];
}
