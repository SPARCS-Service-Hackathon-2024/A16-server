import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRecommendedDto } from './dto/review-recommended.dto';
import { ReviewSearchDto } from './dto/review-search.dto';
import { GetUserReviewsDto } from './dto/get-user-reviews.dto';
import { ReviewService } from './review.service';
import { SearchResultDto } from './dto/search-result.dto';
import { GetUser } from 'src/user/get-user.decoration';
import { User } from '@prisma/client';

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
  @Get('recommended')
  async recommended(@Query() query: ReviewRecommendedDto) {
    console.log(query);
  }

  @ApiOperation({ summary: 'create review' })
  @Post()
  async create(@Body() body: CreateReviewDto) {
    console.log(body);
  }
}

@Controller('user')
@ApiTags('review')
@ApiBearerAuth()
export class ReviewUserController {
  @ApiOperation({ summary: 'get user reviews' })
  @Get(':id/reviews')
  async getUserReviews(@Param() { id }: GetUserReviewsDto) {
    console.log(id);
  }
}
