import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { UserRepository } from './user.repository';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
