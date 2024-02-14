import { ApiProperty } from '@nestjs/swagger';

export class KakaoVerifyDto {
  @ApiProperty()
  code: string;
}
