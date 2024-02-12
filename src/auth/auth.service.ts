import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { EmailRegisterDto } from './dto/email-register.dto';
import { EmailLoginDto } from './dto/email-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiConfigService } from 'src/api-config/api-config.service';

@Injectable()
export class AuthService {
  private readonly verificationSecretKey = crypto
    .randomBytes(32)
    .toString('hex');

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly configService: ApiConfigService,
  ) {}

  async checkEmail(email: string): Promise<void> {
    if (await this.authRepository.checkEmail(email)) {
      throw new ConflictException('Email already exists');
    }
  }

  async checkNickname(email: string): Promise<void> {
    if (await this.authRepository.checkNickname(email)) {
      throw new ConflictException('Nickname already exists');
    }
  }

  async sendEmailVerificationCode(email: string): Promise<void> {
    const code = Math.random().toString(36).slice(2);
    await this.cacheManager.set(email, code, 3 * 60 * 1000);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Email verification',
      text: `Your verification code is ${code}`,
    });
  }

  private generateEmailVerificationToken(email: string): string {
    const payload = { email };
    const token = jwt.sign(payload, this.verificationSecretKey, {
      expiresIn: '1h',
    });
    return token;
  }

  private verifyEmailVerificationToken(email: string, token: string): void {
    const payload = jwt.verify(token, this.verificationSecretKey);
    if (typeof payload !== 'object') throw new BadRequestException();
    if (payload.email !== email) throw new BadRequestException();
  }

  async verifyEmail(email: string, code: string) {
    const cachedCode = await this.cacheManager.get<string>(email);
    if (cachedCode !== code) {
      throw new ConflictException('Invalid verification code');
    }
    await this.cacheManager.del(email);
    const token = this.generateEmailVerificationToken(email);
    return new EmailVerificationDto(token);
  }

  async registerByEmail(body: EmailRegisterDto) {
    await this.checkEmail(body.email);
    await this.checkNickname(body.nickname);
    this.verifyEmailVerificationToken(body.email, body.emailVerificationToken);
    await this.authRepository.createUserByEmail(body);
  }

  async loginByEmail(body: EmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.authRepository.findUserByEmailAndPassword(body);
    if (!user) throw new NotFoundException();
    const token = jwt.sign({ id: user.id }, this.configService.jwtSecret);
    return { accessToken: token };
  }
}
