import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get kakaoApiKey(): string {
    return this.configService.get<string>('KAKAO_API_KEY')!;
  }

  get kakaoRedirectUrl(): string {
    return this.configService.get<string>('KAKAO_REDIRECT_URL')!;
  }
}
