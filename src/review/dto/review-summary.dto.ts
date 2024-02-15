import { ApiProperty } from '@nestjs/swagger';
import { $Enums, File, Place, Prisma, ReviewTag, User } from '@prisma/client';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

class PlaceSummaryDto implements Place {
  @ApiProperty({ format: 'uuid' })
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  readonly name: string;

  @ApiProperty()
  @Expose()
  readonly address: string;
  readonly lat: number;
  readonly lng: number;

  readonly region: string;
  readonly oid: string;
  readonly categoryName: string;
  readonly categoryGroupName: string;
  readonly categoryGroupCode: string;
  readonly phone: string;
  readonly addressName: string;
  readonly roadAddressName: string;
  readonly placeUrl: string;
}

class FileDto
  implements
    Prisma.ReviewFileGetPayload<{
      include: { file: { include: { thumbnail: true } } };
    }>
{
  @ApiProperty()
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  get url() {
    return `${process.env.MINIO_ENDPOINT}/files/${this.id}`;
  }

  readonly reviewId: string;
  readonly fileId: string;
  readonly file: { thumbnail: File | null } & File;
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

export class ReviewSummaryDto
  implements
    Prisma.ReviewGetPayload<{
      include: {
        place: true;
        files: true;
        tags: true;
        _count: { select: { likes: true; comments: true } };
      };
    }>
{
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

  @ApiProperty({ type: PlaceSummaryDto })
  @Type(() => PlaceSummaryDto)
  @Expose()
  readonly place: PlaceSummaryDto;

  @ApiProperty({ type: [FileDto] })
  @Type(() => FileDto)
  @Expose()
  readonly files: FileDto[];

  @ApiProperty()
  @Transform(({ value }) => value.map((tag: ReviewTag) => tag.name), {
    toPlainOnly: true,
  })
  @Expose()
  readonly tags: ReviewTag[];

  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  @Expose()
  readonly user: UserDto;

  @ApiProperty({ type: Number })
  @Expose()
  get likes() {
    return this._count.likes;
  }

  @ApiProperty({ type: Number })
  @Expose()
  get comments() {
    return this._count.comments;
  }

  @ApiProperty()
  @Expose()
  readonly liked: boolean;

  readonly placeId: string;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
  readonly _count: { likes: number; comments: number };
}
