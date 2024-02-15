import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma, User } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

class UserDto implements User {
  @ApiProperty()
  @Expose()
  readonly id: string;
  @ApiProperty()
  @Expose()
  readonly nickname: string;
  readonly provider: $Enums.AuthProvider;
  readonly email: string;
  readonly password: string;
  readonly bio: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class CommentDto
  implements Prisma.ReviewCommentGetPayload<{ include: { user: true } }>
{
  @ApiProperty()
  @Expose()
  readonly id: string;

  @ApiProperty()
  @Expose()
  readonly content: string;

  @ApiProperty()
  @Type(() => UserDto)
  @Expose()
  readonly user: UserDto;

  @ApiProperty()
  @Expose()
  readonly createdAt: Date;

  readonly updatedAt: Date;
  readonly userId: string;
  readonly reviewId: string;
}
