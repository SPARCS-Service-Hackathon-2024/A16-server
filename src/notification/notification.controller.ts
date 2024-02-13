import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { NotificationListResponseDto } from './dto/notification-list-response.dto';
import { NotificationListQuery } from './dto/notification-list-query';
import { GetUser } from 'src/user/get-user.decoration';
import { User } from '@prisma/client';

@ApiTags('notification')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'get notifications' })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationListResponseDto })
  @Get()
  getNotifications(
    @GetUser() user: User,
    @Query() query: NotificationListQuery,
  ) {
    return this.notificationService.getNotifications(user, query);
  }
}
