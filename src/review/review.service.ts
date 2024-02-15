import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewSearchDto } from './dto/review-search.dto';
import { SearchResultDto } from './dto/search-result.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '@prisma/client';
import { GetUserReviewsDto } from './dto/get-user-reviews.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async searchReview(
    user: User,
    dto: ReviewSearchDto,
  ): Promise<SearchResultDto> {
    const list = await this.reviewRepository.search(user, dto);
    const count = await this.reviewRepository.searchCount(dto);
    const liked = await this.reviewRepository.getLiked(user, list);
    return plainToInstance(SearchResultDto, {
      list: list.map((item) => ({
        ...item,
        liked: liked.map((r) => r.id).includes(item.id),
      })),
      count,
    });
  }

  async getUserReviews(user: User, userId: string, dto: GetUserReviewsDto) {
    const list = await this.reviewRepository.getUserReviews(user, userId, dto);
    const count = await this.reviewRepository.getUserReviewsCount(userId);
    const liked = await this.reviewRepository.getLiked(user, list);
    return plainToInstance(SearchResultDto, {
      list: list.map((item) => ({
        ...item,
        liked: liked.map((r) => r.id).includes(item.id),
      })),
      count,
    });
  }
}
