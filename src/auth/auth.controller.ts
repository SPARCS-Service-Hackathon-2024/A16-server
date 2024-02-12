import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailCheckDto } from './dto/email-check.dto';
import { NicknameCheckDto } from './dto/nickname-check.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'check email duplication' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 409, description: 'Conflict - email already exists' })
  @HttpCode(HttpStatus.OK)
  @Post('check/email')
  checkEmail(@Body() body: EmailCheckDto): Promise<void> {
    return this.authService.checkEmail(body.email);
  }

  @ApiOperation({ summary: 'check nickname duplication' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({
    status: 409,
    description: 'Conflict - nickname already exists',
  })
  @HttpCode(HttpStatus.OK)
  @Post('check/nickname')
  checkNickname(@Body() body: NicknameCheckDto): Promise<void> {
    return this.authService.checkNickname(body.nickname);
  }

  @ApiOperation({ summary: 'verify email' })
  @HttpCode(HttpStatus.OK)
  @Post('verify/email')
  verifyEmail(@Body() body: EmailCheckDto): Promise<void> {
    return this.authService.verifyEmail(body.email);
  }

  @ApiOperation({ summary: 'register by email' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({
    status: 409,
    description: 'Conflict - email or nickname already exists',
  })
  @Post('register/email')
  getHello() {
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
