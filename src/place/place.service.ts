import { Injectable } from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { ListQueryDto } from './dto/list-query.dto';
import { plainToInstance } from 'class-transformer';
import { PlaceListDto } from './dto/place-list.dto';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async list(query: ListQueryDto) {
    const count = await this.placeRepository.count();
    const list = await this.placeRepository.list({
      skip: query.skip,
      take: query.take,
    });
    return plainToInstance(PlaceListDto, { count, list });
  }

  async search(keyword: string) {
    const result = await this.placeRepository.search(keyword);
    return result;
  }
}
