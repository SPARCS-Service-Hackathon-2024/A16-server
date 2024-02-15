import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { GetUser } from './get-user.decoration';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @ApiOperation({ summary: 'update user data' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: UserResponseDto })
  @HttpCode(HttpStatus.ACCEPTED)
  @Put('me')
  updateUser(@GetUser() user: User, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(user, body);
  }

  @ApiOperation({ summary: 'get user info by id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDto })
  @ApiParam({ format: 'uuid', name: 'id' })
  @Get(':id')
  getUserById(@GetUser() user: User, @Param() { id }: GetUserInfoDto) {
    return this.userService.getUserInfoById(user, id);
  }

  @ApiOperation({ summary: 'follow user' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiConflictResponse({ description: 'already following' })
  @Post(':id/follow')
  @ApiParam({ format: 'uuid', name: 'id' })
  followUser(@GetUser() user: User, @Param() { id }: GetUserInfoDto) {
    return this.userService.followUser(user, id);
  }

  @ApiOperation({ summary: 'unfollow user' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'not following' })
  @Delete(':id/follow')
  @ApiParam({ format: 'uuid', name: 'id' })
  unfollowUser(@GetUser() user: User, @Param() { id }: GetUserInfoDto) {
    return this.userService.unfollowUser(user, id);
  }
}
