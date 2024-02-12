import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { NotificationListResponseDto } from './dto/notification-list-response.dto';

@ApiTags('notification')
@ApiBearerAuth()
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'get notifications' })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationListResponseDto })
  @Get()
  getNotifications() {}
}
