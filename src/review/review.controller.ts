import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewSearchDto } from './dto/review-search.dto';
import { ReviewRecommendedDto } from './dto/review-recommended.dto';

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
}
