import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from 'src/api-config/api-config.service';
import {
  AuthController,
  AuthEmailController,
  AuthKakaoController,
} from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({
        transport: configService.mailerTransport,
      }),
    }),
    CacheModule.register(),
    JwtModule.registerAsync({
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '1d' },
      }),
    }),
    HttpModule,
  ],
  controllers: [AuthController, AuthEmailController, AuthKakaoController],
  providers: [
    AuthService,
    AuthRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
