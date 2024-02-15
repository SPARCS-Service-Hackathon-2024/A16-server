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
import { FileModule } from './file/file.module';
import { PlaceModule } from './place/place.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UserModule,
    ApiConfigModule,
    AuthModule,
    PrismaModule,
    NotificationModule,
    ReviewModule,
    FileModule,
    PlaceModule,
    ThrottlerModule.forRoot([{ ttl: 60 * 10e3, limit: 10 }]),
  ],
  controllers: [AppController],
  providers: [AppService, ApiConfigService],
})
export class AppModule {}
