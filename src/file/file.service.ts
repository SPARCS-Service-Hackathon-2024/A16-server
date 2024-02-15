import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { JwtService } from '@nestjs/jwt';
import * as ffmpeg from 'fluent-ffmpeg';
import * as stream from 'stream';
import * as os from 'os';
import * as fs from 'fs/promises';
import * as crypto from 'crypto';

async function stream2buffer(
  event: NodeJS.EventEmitter,
  stream: stream.Stream,
): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    event.on('error', (err) => reject(`error converting stream - ${err}`));
    stream.on('data', (chunk) => _buf.push(chunk));
    // stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', (err) => reject(`error converting stream - ${err}`));
    event.on('end', () => resolve(Buffer.concat(_buf)));
  });
}

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async getThumbnailOfVideo(buffer: Buffer) {
    const tmpdir = os.tmpdir();
    const path = `${tmpdir}/${crypto.randomUUID()}`;
    await fs.writeFile(path, buffer);
    const output = new stream.PassThrough();
    const cmd = ffmpeg(path)
      .frames(1)
      .outputFormat('image2pipe')
      .output(output);
    cmd.run();
    const [thumbnail] = await Promise.all([stream2buffer(cmd, output)]);
    await fs.unlink(path);
    return thumbnail;
  }

  async uploadVideo(file: Express.Multer.File) {
    const thumbnail = await this.getThumbnailOfVideo(file.buffer);
    const data = await this.fileRepository.upload(file, 'VIDEO');
    await this.fileRepository.uploadThumbnail(thumbnail, data.id);
    const payload = { id: data.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  /**
   * @returns video id
   */
  async verifyVideoToken(token: string) {
    const { id } = this.jwtService.verify(token);
    const file = await this.fileRepository.get(id);
    if (file?.type !== 'VIDEO') throw new Error('invalid token');
    return id;
  }
}
