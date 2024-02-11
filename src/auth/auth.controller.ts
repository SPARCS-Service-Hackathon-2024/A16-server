import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register/email')
  getHello(): Promise<string> {
    return this.authService.registerByEmail();
  }

  @Post('register/kakao')
  getHello2(): string {
    return 'Hello World!';
  }

  @Post('login/email')
  getHello3(): string {
    return 'Hello World!';
  }

  @Post('login/kakao')
  getHello4(): string {
    return 'Hello World!';
  }
}
