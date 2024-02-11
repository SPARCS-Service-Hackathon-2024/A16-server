import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailCheckDto } from './dto/email-check.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'check email duplication' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @Post('check/email')
  checkEmail(@Body() body: EmailCheckDto): Promise<void> {
    return this.authService.checkEmail(body.email);
  }

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
