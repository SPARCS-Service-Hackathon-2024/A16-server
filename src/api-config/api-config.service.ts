import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from './env.validation';

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
}
