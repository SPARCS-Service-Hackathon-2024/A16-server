import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ApiConfigService } from './api-config/api-config.service';
import { ApiConfigModule } from './api-config/api-config.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationModule } from './notification/notification.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    UserModule,
    ApiConfigModule,
    AuthModule,
    PrismaModule,
    NotificationModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApiConfigService],
})
export class AppModule {}
