import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ReviewOneDto {
  @ApiProperty()
  @IsUUID()
  readonly id: string;
}
