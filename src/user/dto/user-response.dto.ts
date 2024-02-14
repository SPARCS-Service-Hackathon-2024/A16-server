import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

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

  @Exclude()
  readonly createdAt: Date;

  @Exclude()
  readonly provider: string;

  @ApiProperty()
  @Type(() => UserResponseDto)
  @Transform(({ value }) => value.length, { toPlainOnly: true })
  @Expose()
  readonly followings: UserResponseDto[];

  @ApiProperty()
  @Type(() => UserResponseDto)
  @Transform(({ value }) => value.length, { toPlainOnly: true })
  @Expose()
  readonly followers: UserResponseDto[];

  @ApiProperty()
  @Expose()
  readonly isFollowing: boolean;
}
