import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nickname: true,
        provider: true,
        createdAt: true,
        followers: true,
        followings: true,
      },
    });
    return user;
  }

  async isFollowing(userId: string, targetId: string) {
    const following = await this.prismaService.following.findFirst({
      where: {
        userId: userId,
        followingId: targetId,
      },
    });
    return !!following;
  }
}
