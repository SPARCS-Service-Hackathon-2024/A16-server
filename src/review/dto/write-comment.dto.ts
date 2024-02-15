import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class WriteCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
