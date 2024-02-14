import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { HttpService } from '@nestjs/axios';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { createPublicKey } from 'crypto';

type Jwks = { keys: { kid: string }[] };

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
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

  async createUser(
    {
      email,
      password,
      nickname,
    }: { email: string; password: string; nickname: string },
    provider: 'EMAIL' | 'KAKAO',
  ) {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
        provider,
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

  async getKakaoIdToken(code: string) {
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

  private async getKakaoJwks(): Promise<Jwks> {
    const cached = await this.cacheManager.get<Jwks>('kakao-jwks');
    if (cached) return cached;
    const $ = this.httpService.get(
      'https://kauth.kakao.com/.well-known/jwks.json',
    );
    const jwks = (await firstValueFrom($)).data;
    await this.cacheManager.set('kakao-jwks', jwks, 24 * 60 * 60 * 1000);
    return jwks;
  }

  async verifyKakaoToken(token: string) {
    const jwks = await this.getKakaoJwks();
    const { header } = this.jwtService.decode(token, { complete: true });
    if (!header) throw new UnauthorizedException();
    const key = jwks.keys.find((k) => k.kid === header.kid);
    if (!key) throw new UnauthorizedException();
    const publicKey = createPublicKey({ key, format: 'jwk' });
    const exported = publicKey.export({ type: 'pkcs1', format: 'pem' });
    return this.jwtService.verifyAsync(token, {
      issuer: 'https://kapi.kakao.com',
      audience: this.configService.kakaoApiKey,
      algorithms: ['RS256'],
      publicKey: exported,
    });
  }
}
