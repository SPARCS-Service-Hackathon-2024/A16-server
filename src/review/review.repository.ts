import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUserReviewsDto } from './dto/get-user-reviews.dto';
import { Region } from './enums/review-region.enum';
import { With } from './enums/review-with.enum';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private searchQuery({
    regions,
    withs,
    tags,
    query,
  }: {
    regions: Region[];
    withs: With[];
    tags: string[];
    query?: string;
  }): Prisma.ReviewWhereInput {
    if (regions.length === 0) throw new BadRequestException();
    return {
      place: { region: { in: regions } },
      ...(withs.length === 0 ? {} : { with: { some: { in: withs } } }),
      ...(tags.length === 0 ? {} : { tags: { some: { name: { in: tags } } } }),
      ...(query ? { place: { name: { contains: query } } } : {}),
    };
  }

  private include(userId: string): Prisma.ReviewInclude {
    return {
      place: true,
      files: true,
      tags: true,
      _count: { select: { likes: true, comments: true } },
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

  async isLiked(user: User, reviewId: string) {
    const count = await this.prismaService.reviewLike.count({
      where: { userId: user.id, reviewId },
    });
    return count > 0;
  }

  async like(user: User, reviewId: string) {
    await this.prismaService.reviewLike.create({
      data: { userId: user.id, reviewId },
    });
  }

  async unlike(user: User, reviewId: string) {
    await this.prismaService.reviewLike.deleteMany({
      where: { userId: user.id, reviewId },
    });
  }

  async getReview(user: User, reviewId: string) {
    return await this.prismaService.review.findFirst({
      where: { id: reviewId },
      include: this.include(user.id),
    });
  }

  deleteReview(id: string) {
    return this.prismaService.review.delete({ where: { id } });
  }

  async getComments(id: string) {
    return await this.prismaService.reviewComment.findMany({
      where: { reviewId: id },
      include: { user: true },
    });
  }

  async writeComment(user: User, id: string, content: string) {
    await this.prismaService.reviewComment.create({
      data: { userId: user.id, reviewId: id, content },
    });
  }

  async getComment(commentId: string) {
    return await this.prismaService.reviewComment.findFirst({
      where: { id: commentId },
    });
  }

  async deleteComment(commentId: string) {
    await this.prismaService.reviewComment.delete({ where: { id: commentId } });
  }

  async getLikedReviewsCount(user: User) {
    return await this.prismaService.reviewLike.count({
      where: { userId: user.id },
    });
  }
  async getLikedReviews(user: User, dto: GetUserReviewsDto) {
    return await this.prismaService.review.findMany({
      where: { likes: { some: { userId: user.id } } },
      skip: dto.skip,
      take: dto.take,
      include: this.include(user.id),
    });
  }

  writeReview({
    user,
    placeId,
    videoId,
    content,
    stars,
    with: withs,
    tags,
  }: {
    user: User;
    placeId: string;
    videoId: string;
    content: string;
    stars: number;
    with: With[];
    tags: string[];
  }) {
    return this.prismaService.review.create({
      data: {
        userId: user.id,
        placeId,
        files: { connect: { fileId: videoId } },
        content,
        stars,
        withs: { create: withs.map((w) => ({ with: w })) },
        tags: { create: tags.map((name) => ({ name })) },
      },
    });
  }
}
