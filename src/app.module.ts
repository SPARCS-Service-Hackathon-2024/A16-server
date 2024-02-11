import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApiConfigService } from './api-config/api-config.service';
import { ApiConfigModule } from './api-config/api-config.module';

@Module({
  imports: [UserModule, ApiConfigModule],
  controllers: [AppController],
  providers: [AppService, ApiConfigService],
})
export class AppModule {}
