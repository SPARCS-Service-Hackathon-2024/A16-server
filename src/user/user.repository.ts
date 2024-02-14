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

  async addBio(user: User, bio: string) {
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { bio },
    });
  }

  async removeBio(user: User) {
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { bio: null },
    });
  }
}
