import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class NotificationOneDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string;
}
