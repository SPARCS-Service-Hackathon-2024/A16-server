import { ApiProperty } from '@nestjs/swagger';
import { NotificationEntity } from '../entity/notification.entity';

export class NotificationListResponseDto {
  @ApiProperty({ type: NotificationEntity })
  list: NotificationEntity[];

  @ApiProperty()
  count: number;
}
