import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { FollowingDto } from './following.dto';
import { UserTagDto } from './user-tag.dto';

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
  @Type(() => UserTagDto)
  @Transform(({ value }) => value.map((tag: UserTagDto) => tag.name), {
    toPlainOnly: true,
  })
  @Expose()
  readonly tags: UserTagDto[];

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
