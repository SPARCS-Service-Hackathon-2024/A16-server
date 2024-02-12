import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailCheckDto {
  @ApiProperty({ format: 'email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
