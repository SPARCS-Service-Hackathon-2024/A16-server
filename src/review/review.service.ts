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
    return plainToInstance(SearchResultDto, { list, count });
  }

  async getUserReviews(user: User, userId: string, dto: GetUserReviewsDto) {
    const list = await this.reviewRepository.getUserReviews(user, userId, dto);
    const count = await this.reviewRepository.getUserReviewsCount(userId);
    return plainToInstance(SearchResultDto, { list, count });
  }
}
