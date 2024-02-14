import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
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
import { EditBioDto } from './dto/edit-bio.dto';

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

  @ApiOperation({ summary: 'follow user' })
  @Post(':id/follow')
  @ApiParam({ format: 'uuid', name: 'id' })
  followUser(@GetUser() user: User, @Param() { id }: GetUserInfoDto) {
    return this.userService.followUser(user, id);
  }

  @ApiOperation({ summary: 'unfollow user' })
  @Delete(':id/follow')
  @ApiParam({ format: 'uuid', name: 'id' })
  unfollowUser(@GetUser() user: User, @Param() { id }: GetUserInfoDto) {
    return this.userService.unfollowUser(user, id);
  }

  @ApiOperation({ summary: 'add bio' })
  @Post('bio')
  addBio(@GetUser() user: User, @Body() { bio }: EditBioDto) {
    return this.userService.addBio(user, bio);
  }

  @ApiOperation({ summary: 'delete bio' })
  @Delete('bio')
  deleteBio(@GetUser() user: User) {
    return this.userService.deleteBio(user);
  }
}
