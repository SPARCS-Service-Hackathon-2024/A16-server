import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
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
import { NotificationOneDto } from './dto/notification-one.dto';

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

  @ApiOperation({ summary: 'mark all notifications as read' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Put('read')
  markAllAsRead(@GetUser() user: User) {
    return this.notificationService.markAllAsRead(user);
  }

  @ApiOperation({ summary: 'mark notification as read' })
  @ApiResponse({
    status: HttpStatus.RESET_CONTENT,
    description: 'Reset Content',
  })
  @HttpCode(HttpStatus.RESET_CONTENT)
  @Patch(':id/read')
  markAsRead(@GetUser() user: User, @Param() dto: NotificationOneDto) {
    return this.notificationService.markAsRead(user, dto.id);
  }
}
