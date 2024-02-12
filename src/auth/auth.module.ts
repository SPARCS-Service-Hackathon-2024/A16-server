import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({
        transport: configService.mailerTransport,
      }),
    }),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
