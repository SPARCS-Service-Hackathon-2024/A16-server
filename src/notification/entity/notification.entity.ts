import { ApiProperty } from '@nestjs/swagger';

export class NotificationEntity {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  isRead: boolean;
}
