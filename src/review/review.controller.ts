import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRecommendedDto } from './dto/review-recommended.dto';
import { ReviewSearchDto } from './dto/review-search.dto';
import { GetUserReviewsDto } from './dto/get-user-reviews.dto';

@Controller('reviews')
@ApiTags('review')
@ApiBearerAuth()
export class ReviewController {
  @ApiOperation({ summary: 'search reviews' })
  @Get('')
  async search(@Query() query: ReviewSearchDto) {
    console.log(query);
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
