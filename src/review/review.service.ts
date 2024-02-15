import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewSearchDto } from './dto/review-search.dto';
import { SearchResultDto } from './dto/search-result.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async searchReview(dto: ReviewSearchDto): Promise<SearchResultDto> {
    const list = await this.reviewRepository.search(dto);
    const count = await this.reviewRepository.searchCount(dto);
    return plainToInstance(SearchResultDto, { list, count });
  }
}
