import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';
import { AuthRepository } from './auth.repository';
import { EmailLoginDto } from './dto/email-login.dto';
import { EmailRegisterDto } from './dto/email-register.dto';
import { VerificationDto } from './dto/verification.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { KakaoRegisterDto } from './dto/kakao-register.dto';

@Injectable()
export class AuthService {
  private readonly verificationSecretKey = crypto
    .randomBytes(32)
    .toString('hex');

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
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
    const token = this.jwtService.sign(payload, {
      secret: this.verificationSecretKey,
      expiresIn: '1h',
    });
    return token;
  }

  private verifyEmailVerificationToken(email: string, token: string): void {
    const payload = this.jwtService.verify(token, {
      secret: this.verificationSecretKey,
    });
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
    return new VerificationDto(token, email);
  }

  async registerByEmail(body: EmailRegisterDto) {
    await this.checkEmail(body.email);
    await this.checkNickname(body.nickname);
    this.verifyEmailVerificationToken(body.email, body.emailVerificationToken);
    await this.authRepository.createUser(body, 'EMAIL');
  }

  async loginByEmail(body: EmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.authRepository.findUserByEmailAndPassword(body);
    if (!user) throw new NotFoundException();
    const token = await this.jwtService.signAsync({ id: user.id });
    return { accessToken: token };
  }

  async getKakaoAuthorizeUrl() {
    return this.authRepository.getKakaoAuthorizeUrl();
  }

  async verifyKakaoToken(code: string) {
    const token = await this.authRepository.getKakaoIdToken(code);
    const payload = token.split('.')[1];
    const decoded = Buffer.from(payload, 'base64').toString();
    const { email } = JSON.parse(decoded);
    if (!email) throw new UnauthorizedException();
    await this.checkEmail(email);
    return new VerificationDto(token, email);
  }

  async registerWithKakao(body: KakaoRegisterDto) {
    await this.checkEmail(body.email);
    await this.checkNickname(body.nickname);
    const { email } = await this.authRepository.verifyKakaoToken(
      body.emailVerificationToken,
    );
    if (email !== body.email) throw new BadRequestException();
    await this.authRepository.createUser(body, 'KAKAO');
  }
}
