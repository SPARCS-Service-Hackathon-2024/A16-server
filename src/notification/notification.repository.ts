import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationEntity } from './entity/notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAmountByUser(user: User) {
    return await this.prismaService.notification.count({
      where: { userId: user.id },
    });
  }

  async getListByUser({
    user,
    take = 10,
    skip = 0,
  }: {
    user: User;
    take?: number;
    skip?: number;
  }) {
    return await this.prismaService.notification
      .findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: take,
        skip: skip,
      })
      .then((n) => plainToInstance(NotificationEntity, n));
  }

  async markAllAsRead(user: User) {
    return await this.prismaService.notification.updateMany({
      where: { userId: user.id },
      data: { isRead: true },
    });
  }

  async markAsRead(user: User, id: string) {
    return await this.prismaService.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
