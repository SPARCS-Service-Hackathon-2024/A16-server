import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NicknameCheckDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nickname: string;
}
