import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { objectToCamel } from 'ts-case-convert';
import { SearchResultDto } from './dto/search-result.dto';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async search(keyword: string) {
    const result = await this.placeRepository.search(keyword);
    return plainToInstance(SearchResultDto, objectToCamel(result));
  }
}
