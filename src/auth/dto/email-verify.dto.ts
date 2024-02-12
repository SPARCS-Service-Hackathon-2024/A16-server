import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailVerifyDto {
  @ApiProperty({ format: 'email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ format: 'verification code' })
  @IsString()
  @IsNotEmpty()
  readonly code: string;
}
