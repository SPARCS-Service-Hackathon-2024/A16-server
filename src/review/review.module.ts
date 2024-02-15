import { Module } from '@nestjs/common';
import { ReviewController, ReviewUserController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';

@Module({
  controllers: [ReviewController, ReviewUserController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
