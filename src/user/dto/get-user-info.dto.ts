import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetUserInfoDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  readonly id: string;
}
