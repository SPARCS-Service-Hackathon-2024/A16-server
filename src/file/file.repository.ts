import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  async upload(file: Express.Multer.File, type: 'VIDEO') {
    const data = await this.prismaService.file.create({
      data: { originalName: file.originalname },
    });
    await this.minioService.client.putObject(
      { VIDEO: 'videos' }[type],
      data.id,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype, 'Original-Name': file.originalname },
    );
    return data;
  }

  async uploadThumbnail(buffer: Buffer, id: string) {
    const data = await this.prismaService.file.create({
      data: { originalName: `${id}.png`, original: { connect: { id } } },
    });
    await this.minioService.client.putObject(
      'thumbnails',
      data.id,
      buffer,
      buffer.length,
      { 'Content-Type': 'image/png' },
    );
    return data;
  }
}
