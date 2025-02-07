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
import type { User, UserDocument } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import type { FilterQuery } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  getUsers(
    @CurrentUser() user: UserDocument,
    @Query() query: FilterQuery<User>,
  ) {
    if (user.role !== 'admin')
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );

    return this.usersService.getAllUser(query);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getCurrentUser(@CurrentUser() user: UserDocument) {
    return {
      message: 'User fetched successfully',
      data: user,
    };
  }

  @Patch()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('avatar'))
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
  updatePassword(
    @CurrentUser() user: UserDocument,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(user, updatePasswordDto);
  }
}
