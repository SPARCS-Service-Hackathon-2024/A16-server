import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AxiosError } from 'axios';
import { plainToInstance } from 'class-transformer';
import { catchError, firstValueFrom } from 'rxjs';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService,
    private readonly userRepository: UserRepository,
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
    return this.getUserInfoById(user, user.id);
  }

  async getUserInfoById(user: User, id: string) {
    const foundUser = await this.userRepository.findUserById(id);
    if (!foundUser) throw new NotFoundException();
    const isFollowing = await this.userRepository.isFollowing(user.id, id);
    return plainToInstance(UserResponseDto, { ...foundUser, isFollowing });
  }

  async followUser(user: User, targetId: string) {
    if (user.id === targetId) throw new BadRequestException();
    if (await this.userRepository.isFollowing(user.id, targetId))
      throw new ConflictException();
    await this.userRepository.followUser(user.id, targetId);
    return this.getUserInfoById(user, targetId);
  }

  async unfollowUser(user: User, targetId: string) {
    if (user.id === targetId) throw new BadRequestException();
    if (!(await this.userRepository.isFollowing(user.id, targetId)))
      throw new NotFoundException();
    await this.userRepository.unfollowUser(user.id, targetId);
    return this.getUserInfoById(user, targetId);
  }

  async updateUser(user: User, body: UpdateUserDto) {
    await this.userRepository.updateUser(user, body);
    return this.getUserInfo(user);
  }
}
