import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { EmailVerificationDto } from './dto/email-verification.dto';

@Injectable()
export class AuthService {
  private readonly verificationSecretKey = crypto
    .randomBytes(32)
    .toString('hex');

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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

  async verifyEmail(email: string, code: string) {
    const cachedCode = await this.cacheManager.get<string>(email);
    if (cachedCode !== code) {
      throw new ConflictException('Invalid verification code');
    }
    await this.cacheManager.del(email);
    const payload = { email };
    const token = jwt.sign(payload, this.verificationSecretKey, {
      expiresIn: '1h',
    });
    return new EmailVerificationDto(token);
  }

  async registerByEmail() {
    return 'registerByEmail';
  }
}
