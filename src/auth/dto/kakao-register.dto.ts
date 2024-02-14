import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class KakaoRegisterDto {
  @ApiProperty({ format: 'email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  readonly emailVerificationToken: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;

  @ApiProperty({ format: 'password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
