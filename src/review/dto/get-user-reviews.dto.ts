import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class GetUserReviewsDto {
  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsUUID()
  id: string;
}
