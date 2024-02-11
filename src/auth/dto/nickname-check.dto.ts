import { IsNotEmpty, IsString } from 'class-validator';

export class NicknameCheckDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;
}
