import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiFile } from './file.decorator';
import { FileService } from './file.service';

@Controller('files')
@ApiTags('file')
@ApiBearerAuth()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ summary: 'Upload a video' })
  @ApiFile()
  @Post('videos')
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException();
    return this.fileService.uploadVideo(file);
  }
}
