import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewSearchDto } from './dto/review-search.dto';
import { SearchResultDto } from './dto/search-result.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '@prisma/client';
import { GetUserReviewsDto } from './dto/get-user-reviews.dto';
import { CommentDto } from './dto/comment.dto';
import { ReviewSummaryDto } from './dto/review-summary.dto';

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

  async getReview(user: User, id: string) {
    const review = await this.reviewRepository.getReview(user, id);
    if (!review) throw new NotFoundException('review not found');
    const liked = await this.reviewRepository.getLiked(user, [review]);
    return plainToInstance(ReviewSummaryDto, {
      ...review,
      liked: liked.map((r) => r.id).includes(review.id),
    });
  }

  async like(user: User, reviewId: string) {
    if (await this.reviewRepository.isLiked(user, reviewId)) {
      throw new ConflictException('already liked');
    }
    await this.reviewRepository.like(user, reviewId);
  }

  async unlike(user: User, reviewId: string) {
    if (!(await this.reviewRepository.isLiked(user, reviewId))) {
      throw new ConflictException('not liked');
    }
    await this.reviewRepository.unlike(user, reviewId);
  }

  async getComments(id: string) {
    const list = await this.reviewRepository.getComments(id);
    return plainToInstance(CommentDto, list);
  }

  async writeComment(user: User, reviewId: string, content: string) {
    await this.reviewRepository.writeComment(user, reviewId, content);
  }

  async deleteComment(user: User, commentId: string) {
    const comment = await this.reviewRepository.getComment(commentId);
    if (!comment) throw new NotFoundException('comment not found');
    if (comment.userId !== user.id)
      throw new ConflictException('not your comment');
    await this.reviewRepository.deleteComment(commentId);
  }
}
