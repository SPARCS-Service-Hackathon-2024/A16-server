import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { AxiosError } from 'axios';
import { plainToInstance } from 'class-transformer';
import { catchError, firstValueFrom } from 'rxjs';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService,
  ) {}

  private async getAccessToken(authorizationCode: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .post<{ access_token: string }>(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: this.configService.kakaoApiKey,
            redirect_uri: this.configService.kakaoRedirectUrl,
            code: authorizationCode,
          },
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(this.getAccessToken.name, error.message);
            throw new UnauthorizedException();
          }),
        ),
    );
    return data.access_token;
  }

  async login(authorizationCode: string) {
    const accessToken = await this.getAccessToken(authorizationCode);
    return accessToken;
  }

  async getUserInfo(user: User) {
    return plainToInstance(UserResponseDto, user);
  }
}
