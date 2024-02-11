import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Post('register/email')
  getHello(): string {
    return 'Hello World!';
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
