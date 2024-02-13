import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationListQuery } from './dto/notification-list-query';
import { User } from '@prisma/client';
import { NotificationListResponseDto } from './dto/notification-list-response.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotifications(
    user: User,
    query: NotificationListQuery,
  ): Promise<NotificationListResponseDto> {
    const notifications = await this.notificationRepository.getListByUser({
      user,
      ...query,
    });
    const count = await this.notificationRepository.getAmountByUser(user);
    return { list: notifications, count };
  }

  async markAllAsRead(user: User) {
    await this.notificationRepository.markAllAsRead(user);
  }

  async markAsRead(user: User, id: string) {
    await this.notificationRepository.markAsRead(user, id);
  }
}
