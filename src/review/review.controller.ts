import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewSearchDto } from './dto/review-search.dto';

@Controller('reviews')
@ApiTags('review')
@ApiBearerAuth()
export class ReviewController {
  @ApiOperation({ summary: 'search reviews' })
  @Get('')
  async search(@Query() query: ReviewSearchDto) {
    console.log(query);
  }
}
