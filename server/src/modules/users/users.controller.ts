import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ForbiddenException,
  Patch,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/modules/auth/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Role, User, UserDocument } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import type { FilterQuery } from 'mongoose';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiConsumes,
  ApiSecurity,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersSwagger } from 'src/config/constants/user.swagger';
import { USERS_MESSAGES } from 'src/config/messages';

@ApiTags('Users')
@ApiSecurity('x-api-key')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation(UsersSwagger.createUser.operation)
  @ApiOkResponse(UsersSwagger.createUser.createdResponse)
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiQuery(UsersSwagger.getAllUsers.query)
  @ApiOperation(UsersSwagger.getAllUsers.operation)
  @ApiOkResponse(UsersSwagger.getAllUsers.okResponse)
  getUsers(
    @CurrentUser() user: UserDocument,
    @Query() query: FilterQuery<User>,
  ) {
    if (user.role !== Role.Admin)
      throw new ForbiddenException(USERS_MESSAGES.FORBIDDEN);

    return this.usersService.getAllUser(query);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation(UsersSwagger.getCurrentUser.operation)
  @ApiOkResponse(UsersSwagger.getCurrentUser.okResponse)
  getCurrentUser(@CurrentUser() user: UserDocument) {
    return { message: 'User fetched successfully', data: user };
  }

  @Patch()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBearerAuth()
  @ApiOperation(UsersSwagger.updateUser.operation)
  @ApiConsumes(UsersSwagger.updateUser.consumes)
  @ApiOkResponse(UsersSwagger.updateUser.okResponse)
  async updateUser(
    @CurrentUser() user: UserDocument,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return await this.usersService.updateUser(
      user,
      updateUserDto,
      avatar,
    );
  }

  @Patch('update-password')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation(UsersSwagger.updatePassword.operation)
  @ApiOkResponse(UsersSwagger.updatePassword.okResponse)
  updatePassword(
    @CurrentUser() user: UserDocument,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(user, updatePasswordDto);
  }
}
