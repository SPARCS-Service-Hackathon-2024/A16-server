import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { HttpService } from '@nestjs/axios';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService,
  ) {}

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    return !!user;
  }

  async checkNickname(nickname: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { nickname },
    });
    return !!user;
  }

  async createUserByEmail({
    email,
    password,
    nickname,
  }: {
    email: string;
    password: string;
    nickname: string;
  }) {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
        provider: 'EMAIL',
      },
    });
    return user;
  }

  async findUserByEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.prismaService.user.findUnique({
      where: { email, provider: 'EMAIL' },
    });
    if (!user) return null;
    const result = await bcrypt.compare(password, user.password);
    if (!result) return null;
    return user;
  }

  async findUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nickname: true,
        provider: true,
        createdAt: true,
      },
    });
    return user;
  }

  async getKakaoAuthorizeUrl() {
    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.configService.kakaoApiKey}&redirect_uri=${this.configService.kakaoRedirectUrl}&response_type=code`;
  }

  async verifyKakaoToken(code: string) {
    const $ = this.httpService.post('https://kauth.kakao.com/oauth/token', {
      params: {
        grant_type: 'authorization_code',
        client_id: this.configService.kakaoApiKey,
        redirect_uri: this.configService.kakaoRedirectUrl,
        code,
        client_secret: this.configService.kakaoApiSecret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const { id_token } = (await firstValueFrom($)).data;
    return id_token as string;
  }
}
