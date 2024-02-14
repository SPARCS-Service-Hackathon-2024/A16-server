import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserResponseDto } from './dto/user-response.dto';
import { GetUser } from './get-user.decoration';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'user data' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @Get('me')
  getUser(@GetUser() user: User) {
    return this.userService.getUserInfo(user);
  }
}
