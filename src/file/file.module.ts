import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';
import { JwtModule } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Module({
  imports: [
    MinioModule.registerAsync({
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.minioConfig,
    }),
    JwtModule.register({ secret: crypto.randomBytes(64).toString('hex') }),
  ],
  controllers: [FileController],
  providers: [FileService, FileRepository],
  exports: [FileService],
})
export class FileModule {}
