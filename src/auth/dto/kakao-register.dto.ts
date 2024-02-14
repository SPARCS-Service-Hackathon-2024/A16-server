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

  get password() {
    const payload = this.emailVerificationToken.split('.')[1];
    const decoded = Buffer.from(payload, 'base64').toString();
    const { sub } = JSON.parse(decoded);
    return sub as string;
  }
}
