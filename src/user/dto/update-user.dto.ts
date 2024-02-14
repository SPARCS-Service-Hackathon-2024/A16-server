import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(3)
  tags: string[];
}
