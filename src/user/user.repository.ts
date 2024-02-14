import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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
        bio: true,
        followers: true,
        followings: true,
        tags: true,
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

  async followUser(userId: string, targetId: string) {
    await this.prismaService.following.create({
      data: {
        userId,
        followingId: targetId,
      },
    });
  }

  async unfollowUser(userId: string, targetId: string) {
    await this.prismaService.following.deleteMany({
      where: {
        userId,
        followingId: targetId,
      },
    });
  }

  async updateUser(
    user: User,
    { bio, tags, nickname }: { bio: string; tags: string[]; nickname: string },
  ) {
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        bio,
        nickname,
        tags: {
          deleteMany: { userId: user.id },
          createMany: { data: tags.map((name) => ({ name })) },
        },
      },
    });
  }
}
