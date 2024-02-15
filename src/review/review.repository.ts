import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Region } from './enums/review-region.enum';
import { With } from './enums/review-with.enum';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private searchQuery({
    regions,
    withs,
    tags,
  }: {
    regions: Region[];
    withs: With[];
    tags: string[];
  }): Prisma.ReviewWhereInput {
    if (regions.length === 0) throw new BadRequestException();
    return {
      place: { region: { in: regions } },
      ...(withs.length === 0 ? {} : { with: { some: { in: withs } } }),
      ...(tags.length === 0 ? {} : { tags: { some: { name: { in: tags } } } }),
    };
  }

  private include(userId: string): Prisma.ReviewInclude {
    return {
      place: true,
      files: true,
      tags: true,
      likes: true,
      user: { include: { followers: { where: { userId } } } },
    };
  }

  async search(
    user: User,
    {
      skip = 0,
      take = 10,
      ...query
    }: { skip: number; take: number } & Parameters<typeof this.searchQuery>[0],
  ) {
    return await this.prismaService.review.findMany({
      skip,
      take,
      where: this.searchQuery(query),
      include: this.include(user.id),
    });
  }

  async searchCount(query: Parameters<typeof this.searchQuery>[0]) {
    return await this.prismaService.review.count({
      where: this.searchQuery(query),
    });
  }

  async getUserReviews(
    user: User,
    userId: string,
    { skip = 0, take = 10 }: { skip: number; take: number },
  ) {
    return await this.prismaService.review.findMany({
      skip,
      take,
      where: { userId },
      include: this.include(user.id),
    });
  }

  async getUserReviewsCount(userId: string) {
    return await this.prismaService.review.count({ where: { userId } });
  }

  async getLiked(user: User, list: Awaited<ReturnType<typeof this.search>>) {
    return await this.prismaService.review.findMany({
      where: {
        id: { in: list.map((review) => review.id) },
        likes: { some: { userId: user.id } },
      },
    });
  }
}
