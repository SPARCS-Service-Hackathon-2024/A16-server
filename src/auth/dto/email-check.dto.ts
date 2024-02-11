import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailCheckDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
