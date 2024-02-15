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
import { PlaceListDto } from './dto/place-list.dto';
import { ListQueryDto } from './dto/list-query.dto';

@Controller('places')
@ApiTags('place')
@ApiBearerAuth()
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiOperation({ summary: 'list place' })
  @ApiOkResponse({ type: PlaceListDto })
  @Get()
  list(@Query() query: ListQueryDto) {
    return this.placeService.list(query);
  }

  @ApiOperation({ summary: 'search place by keyword' })
  @ApiOkResponse({ type: SearchResultDto })
  @UseGuards(ThrottlerGuard)
  @Get('search')
  search(@Query() { keyword }: PlaceSearchDto) {
    return this.placeService.search(keyword);
  }
}
