import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from './auth/auth.guard';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'ping' })
  @Get()
  getHello(): string {
    return this.appService.ping();
  }
}
