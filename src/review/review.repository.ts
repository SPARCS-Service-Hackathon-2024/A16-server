import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Region } from './enums/review-region.enum';
import { With } from './enums/review-with.enum';
import { Prisma } from '@prisma/client';

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

  async search({
    skip = 0,
    take = 10,
    ...query
  }: { skip: number; take: number } & Parameters<typeof this.searchQuery>[0]) {
    return await this.prismaService.review.findMany({
      skip,
      take,
      where: this.searchQuery(query),
      include: { place: true, files: true, tags: true },
    });
  }

  async searchCount(query: Parameters<typeof this.searchQuery>[0]) {
    return await this.prismaService.review.count({
      where: this.searchQuery(query),
    });
  }
}
