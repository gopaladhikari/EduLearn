import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ForbiddenException,
  Patch,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/modules/auth/current-user.decorator';
import type { UserDocument } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  getUsers(@CurrentUser() user: UserDocument) {
    if (user.role === 'admin') return this.usersService.getAllUser();
    throw new ForbiddenException(
      'You are not authorized to access this resource',
    );
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getCurrentUser(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Patch()
  @UseGuards(JwtGuard)
  updateUser(
    @CurrentUser() user: UserDocument,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(user, updateUserDto);
  }

  @Patch('update-password')
  @UseGuards(JwtGuard)
  updatePassword(
    @CurrentUser() user: UserDocument,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(user, updatePasswordDto);
  }

  @Patch('verify-email/:token')
  verifyEmail(
    @Body('email') email: string,
    @Param('token') token: string,
  ) {
    return this.usersService.verifyEmail(email, token);
  }
}
