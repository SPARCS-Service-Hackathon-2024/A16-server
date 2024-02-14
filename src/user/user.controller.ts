import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserResponseDto } from './dto/user-response.dto';
import { GetUser } from './get-user.decoration';
import { UserService } from './user.service';
import { GetUserInfoDto } from './dto/get-user-info.dto';

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

  @ApiOperation({ summary: 'get user info by id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @ApiParam({ format: 'uuid', name: 'id' })
  @Get(':id')
  getUserById(@GetUser() user: User, @Param() { id }: GetUserInfoDto) {
    return this.userService.getUserInfoById(user, id);
  }
}
