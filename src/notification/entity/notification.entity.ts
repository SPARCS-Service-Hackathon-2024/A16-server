import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

enum NotificationType {
  COMMENT = 'COMMENT',
  LIKE = 'LIKE',
  FOLLOW = 'FOLLOW',
}

export class NotificationEntity {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty({ enum: NotificationType, enumName: 'NotificationType' })
  @Expose()
  type: NotificationType;

  @ApiProperty()
  @ApiProperty()
  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  userId: string;
}
