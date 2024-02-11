import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { ApiConfigService } from './api-config/api-config.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), UserModule],
  controllers: [AppController],
  providers: [AppService, ApiConfigService],
})
export class AppModule {}
