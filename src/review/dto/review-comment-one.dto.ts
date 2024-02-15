import { ApiProperty } from '@nestjs/swagger';
import { ReviewOneDto } from './review-one.dto';
import { IsUUID } from 'class-validator';

export class ReviewCommentOneDto extends ReviewOneDto {
  @ApiProperty()
  @IsUUID()
  readonly commentId: string;
}
