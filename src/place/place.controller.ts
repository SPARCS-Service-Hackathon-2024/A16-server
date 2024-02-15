import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PlaceService } from './place.service';
import { PlaceSearchDto } from './dto/search.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SearchResultDto } from './dto/search-result.dto';

@Controller('places')
@ApiTags('place')
@ApiBearerAuth()
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({ summary: 'search place by keyword' })
  @ApiOkResponse({ type: SearchResultDto })
  @UseGuards(ThrottlerGuard)
  @Get('search')
  search(@Query() { keyword }: PlaceSearchDto) {
    return this.placeService.search(keyword);
  }
}
