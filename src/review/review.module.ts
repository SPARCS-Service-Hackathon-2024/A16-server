import { Module } from '@nestjs/common';
import { ReviewController, ReviewUserController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController, ReviewUserController],
  providers: [ReviewService],
})
export class ReviewModule {}
