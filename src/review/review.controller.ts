import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRecommendedDto } from './dto/review-recommended.dto';
import { ReviewSearchDto } from './dto/review-search.dto';
import { GetUserReviewsParamDto } from './dto/get-user-reviews-param.dto';
import { ReviewService } from './review.service';
import { SearchResultDto } from './dto/search-result.dto';
import { GetUser } from 'src/user/get-user.decoration';
import { User } from '@prisma/client';
import { Region } from './enums/review-region.enum';
import { GetUserReviewsDto } from './dto/get-user-reviews.dto';
import { ReviewOneDto } from './dto/review-one.dto';
import { WriteCommentDto } from './dto/write-comment.dto';
import { ReviewCommentOneDto } from './dto/review-comment-one.dto';
import { ReviewSummaryDto } from './dto/review-summary.dto';

@Controller('reviews')
@ApiTags('review')
@ApiBearerAuth()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'search reviews' })
  @ApiOkResponse({ type: SearchResultDto })
  @Get('')
  async search(@GetUser() user: User, @Query() query: ReviewSearchDto) {
    return this.reviewService.searchReview(user, query);
  }

  @ApiOperation({ summary: 'get recommended reviews' })
  @ApiOkResponse({ type: SearchResultDto })
  @Get('recommended')
  async recommended(
    @GetUser() user: User,
    @Query() query: ReviewRecommendedDto,
  ) {
    return this.reviewService.searchReview(user, {
      ...query,
      regions: Object.values(Region),
      withs: [],
      tags: [],
    });
  }

  @ApiOperation({ summary: 'get liked reviews' })
  @ApiOkResponse({ type: SearchResultDto })
  @Get('likes')
  async likes(@GetUser() user: User, @Query() query: GetUserReviewsDto) {
    return this.reviewService.getLikedReviews(user, query);
  }

  @ApiOperation({ summary: 'create review' })
  @ApiCreatedResponse({ type: ReviewSummaryDto })
  @Post()
  async create(@GetUser() user: User, @Body() body: CreateReviewDto) {
    return this.reviewService.writeReview(user, body);
  }

  @ApiOperation({ summary: 'get review' })
  @ApiOkResponse({ type: ReviewSummaryDto })
  @Get(':id')
  async get(@GetUser() user: User, @Param() { id }: ReviewOneDto) {
    return this.reviewService.getReview(user, id);
  }

  @ApiOperation({ summary: 'delete review' })
  @Delete(':id')
  async delete(@GetUser() user: User, @Param() { id }: ReviewOneDto) {
    this.reviewService.deleteReview(user, id);
  }

  @ApiOperation({ summary: 'like review' })
  @Post(':id/like')
  async like(@GetUser() user: User, @Param() { id }: ReviewOneDto) {
    await this.reviewService.like(user, id);
  }

  @ApiOperation({ summary: 'dislike review' })
  @Delete(':id/like')
  async unlike(@GetUser() user: User, @Param() { id }: ReviewOneDto) {
    await this.reviewService.unlike(user, id);
  }

  @ApiOperation({ summary: 'get review comments' })
  @Get(':id/comments')
  async getComments(@Param() { id }: ReviewOneDto) {
    return this.reviewService.getComments(id);
  }

  @ApiOperation({ summary: 'comment review' })
  @Post(':id/comments')
  async comment(
    @GetUser() user: User,
    @Param() { id }: ReviewOneDto,
    @Body() body: WriteCommentDto,
  ) {
    return this.reviewService.writeComment(user, id, body.content);
  }

  @ApiOperation({ summary: 'delete review comment' })
  @Delete(':id/comments/:commentId')
  async deleteComment(
    @GetUser() user: User,
    @Param() { commentId }: ReviewCommentOneDto,
  ) {
    return this.reviewService.deleteComment(user, commentId);
  }
}

@Controller('user')
@ApiTags('review')
@ApiBearerAuth()
export class ReviewUserController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'get user reviews' })
  @ApiOkResponse({ type: SearchResultDto })
  @Get(':id/reviews')
  async getUserReviews(
    @GetUser() user: User,
    @Param() { id }: GetUserReviewsParamDto,
    @Query() query: GetUserReviewsDto,
  ) {
    return this.reviewService.getUserReviews(user, id, query);
  }
}
