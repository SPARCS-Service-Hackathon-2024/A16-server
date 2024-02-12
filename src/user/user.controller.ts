import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from './get-user.decoration';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'user data' })
  @ApiBearerAuth()
  @Get('me')
  getUser(@GetUser() user: User) {
    return user;
  }
}
