import { ConflictException, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailerService: MailerService,
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

  async verifyEmail(email: string): Promise<void> {
    const code = Math.floor(Math.random() * 1000000);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Email verification',
      text: `Your verification code is ${code}`,
    });
  }

  async registerByEmail() {
    return 'registerByEmail';
  }
}
