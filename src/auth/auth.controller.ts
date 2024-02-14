import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';
import { EmailCheckDto } from './dto/email-check.dto';
import { EmailLoginDto } from './dto/email-login.dto';
import { EmailRegisterDto } from './dto/email-register.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { KakaoRegisterDto } from './dto/kakao-register.dto';
import { KakaoVerifyDto } from './dto/kakao-verify.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { NicknameCheckDto } from './dto/nickname-check.dto';
import { VerificationDto } from './dto/verification.dto';

@ApiTags('auth/common')
@Controller('auth')
@Public()
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
}

@ApiTags('auth/email')
@Controller('auth/email')
@Public()
export class AuthEmailController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'send email verification code' })
  @Post('code')
  verifyEmail(@Body() body: EmailCheckDto): Promise<void> {
    return this.authService.sendEmailVerificationCode(body.email);
  }

  @ApiOperation({ summary: 'verify email' })
  @ApiOkResponse({ type: VerificationDto })
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  verifyEmailCode(@Body() body: EmailVerifyDto): Promise<VerificationDto> {
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
  @Post('register')
  registerByEmail(@Body() body: EmailRegisterDto) {
    return this.authService.registerByEmail(body);
  }

  @ApiOperation({ summary: 'login by email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'login succeed',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'wrong email or password',
  })
  @Post('login')
  loginByEmail(@Body() body: EmailLoginDto) {
    return this.authService.loginByEmail(body);
  }
}

@ApiTags('auth/kakao')
@Controller('auth/kakao')
@Public()
export class AuthKakaoController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'get kakao authorize url' })
  @Get('authorize')
  verifyEmail() {
    return this.authService.getKakaoAuthorizeUrl();
  }

  @ApiOperation({ summary: 'verify kakao token' })
  @ApiOkResponse({ type: VerificationDto })
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  verifyKakaoToken(@Body() { code }: KakaoVerifyDto) {
    return this.authService.verifyKakaoToken(code);
  }

  @ApiOperation({ summary: 'register by kakao' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict - email or nickname already exists',
  })
  @Post('register')
  registerWithKakao(@Body() body: KakaoRegisterDto) {
    return this.authService.registerWithKakao(body);
  }

  @ApiOperation({ summary: 'login by kakao' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginWithKakao(@Body() { code }: KakaoVerifyDto) {
    return this.authService.loginWithKakao(code);
  }
}
