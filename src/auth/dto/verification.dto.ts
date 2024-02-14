import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class VerificationDto {
  constructor(token: string, email: string) {
    this.token = token;
    this.email = email;
  }
  @ApiProperty({ format: 'email' })
  @Expose()
  readonly email: string;

  @ApiProperty({ format: 'jwt' })
  @Expose()
  readonly token: string;
}
