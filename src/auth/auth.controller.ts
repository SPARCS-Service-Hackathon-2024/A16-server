import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailCheckDto } from './dto/email-check.dto';
import { NicknameCheckDto } from './dto/nickname-check.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { EmailRegisterDto } from './dto/email-register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'check email duplication' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict - email already exists',
  })
  @HttpCode(HttpStatus.OK)
  @Post('check/email')
  checkEmail(@Body() body: EmailCheckDto): Promise<void> {
    return this.authService.checkEmail(body.email);
  }

  @ApiOperation({ summary: 'check nickname duplication' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
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
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict - email or nickname already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Wrong email verification token',
  })
  @Post('email/register')
  registerByEmail(@Body() body: EmailRegisterDto) {
    return this.authService.registerByEmail(body);
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
