import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailCheckDto } from './dto/email-check.dto';
import { NicknameCheckDto } from './dto/nickname-check.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';

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

  @ApiOperation({ summary: 'send email verification code' })
  @Post('email/code')
  verifyEmail(@Body() body: EmailCheckDto): Promise<void> {
    return this.authService.sendEmailVerificationCode(body.email);
  }

  @ApiOperation({ summary: 'verify email' })
  @HttpCode(HttpStatus.OK)
  @Post('email/verify')
  verifyEmailCode(@Body() body: EmailVerifyDto): Promise<EmailVerificationDto> {
    return this.authService.verifyEmail(body.email, body.code);
  }

  @ApiOperation({ summary: 'register by email' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({
    status: 409,
    description: 'Conflict - email or nickname already exists',
  })
  @Post('email/register')
  getHello() {
    return this.authService.registerByEmail();
  }

  @Post('kakao/register')
  getHello2(): string {
    return 'Hello World!';
  }

  @Post('email/login')
  getHello3(): string {
    return 'Hello World!';
  }

  @Post('kakao/login')
  getHello4(): string {
    return 'Hello World!';
  }
}
