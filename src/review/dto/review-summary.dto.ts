import { ApiProperty } from '@nestjs/swagger';
import {
  $Enums,
  Place,
  Review,
  ReviewFile,
  ReviewTag,
  User,
} from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

class PlaceDto implements Place {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  readonly name: string;

  readonly region: string;

  @ApiProperty()
  @Expose()
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
}

class FileDto implements ReviewFile {
  @ApiProperty()
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  readonly url: string;

  readonly reviewId: string;
}

class UserDto implements User {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  nickname: string;

  @ApiProperty()
  @Expose()
  get isFollowing() {
    return this.followers.length !== 0;
  }

  provider: $Enums.AuthProvider;
  email: string;
  password: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  followers: User[];
}

export class ReviewSummaryDto implements Review {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  readonly title: string;

  @ApiProperty()
  @Expose()
  readonly createdAt: Date;

  @Exclude()
  readonly userId: string;

  @ApiProperty()
  @Expose()
  readonly stars: number;

  @ApiProperty()
  @Expose()
  readonly content: string;

  @ApiProperty({ type: PlaceDto })
  @Type(() => PlaceDto)
  @Expose()
  readonly place: PlaceDto;

  @ApiProperty({ type: [FileDto] })
  @Type(() => FileDto)
  @Expose()
  readonly files: FileDto[];

  @ApiProperty()
  @Transform(({ value }) => value.map((tag: ReviewTag) => tag.name), {
    toPlainOnly: true,
  })
  @Expose()
  readonly tags: string[];

  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  @Expose()
  readonly user: UserDto;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => value.length, { toPlainOnly: true })
  @Expose()
  readonly likes: any;

  readonly placeId: string;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}
