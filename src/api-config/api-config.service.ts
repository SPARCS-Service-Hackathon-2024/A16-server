import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './env.validation';
import { ClientOptions } from 'minio';

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  get kakaoApiKey(): string {
    return this.configService.get<string>('KAKAO_API_KEY')!;
  }

  get kakaoRedirectUrl(): string {
    return this.configService.get<string>('KAKAO_REDIRECT_URL')!;
  }

  get nodeEnv(): Environment {
    return this.configService.get<Environment>('NODE_ENV')!;
  }

  get port(): number {
    return this.configService.get<number>('PORT')!;
  }

  get mailerTransport(): string {
    return this.configService.get<string>('MAILER_TRANSPORT')!;
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET')!;
  }

  get kakaoApiSecret(): string {
    return this.configService.get<string>('KAKAO_API_SECRET')!;
  }

  get minioConfig(): ClientOptions {
    return {
      endPoint: this.configService.get<string>('MINIO_ENDPOINT')!,
      port: parseInt(this.configService.get<string>('MINIO_PORT')!),
      useSSL: false,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY')!,
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY')!,
    };
  }
}
