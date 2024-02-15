import { Injectable } from '@nestjs/common';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async search(keyword: string) {
    const result = await this.placeRepository.search(keyword);
    return result;
  }
}
