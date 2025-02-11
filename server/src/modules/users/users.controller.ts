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
import { User, UserDocument } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import type { FilterQuery } from 'mongoose';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiBody,
  ApiConsumes,
  ApiSecurity,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiSecurity('x-api-key')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'User has been created successfully.',
    schema: {
      example: {
        message: 'User created successfully',
        data: {
          _id: '65f17a5a1234abcd5678ef90',
          fullName: 'Test Admin',
          email: 'admin@edulearn.com',
          role: 'admin',
        },
      },
    },
  })
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch all users (Admin Only)' })
  @ApiOkResponse({
    description: 'List of all users according to the query.',
    schema: {
      example: {
        message: 'Users fetched successfully',
        data: [
          {
            _id: '65f17a5a1234abcd5678ef90',
            fullName: 'Test Admin',
            email: 'admin@edulearn.com',
            role: 'admin',
          },
        ],
      },
    },
  })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiOkResponse({
    description:
      'Returns the details of the currently logged-in user.',
    schema: {
      example: {
        message: 'User fetched successfully',
        data: {
          _id: '65f17a5a1234abcd5678ef90',
          fullName: 'Test Admin',
          email: 'admin@edulearn.com',
          role: 'admin',
        },
      },
    },
  })
  getCurrentUser(@CurrentUser() user: UserDocument) {
    return { message: 'User fetched successfully', data: user };
  }

  @Patch()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile information' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'User update data',
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string', example: 'Updated Admin' },
        username: { type: 'string', example: 'updated_username' },
        bio: { type: 'string', example: 'New bio here' },
        phoneNumber: { type: 'number', example: 1234567890 },
        avatar: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOkResponse({
    description: 'User updated successfully.',
    schema: {
      example: {
        message: 'User updated successfully',
        data: {
          _id: '65f17a5a1234abcd5678ef90',
          fullName: 'Updated Admin',
          email: 'admin@edulearn.com',
          role: 'admin',
          avatar: { url: 'image_url', publicId: 'cloudinary_id' },
        },
      },
    },
  })
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
  @ApiOperation({ summary: 'Update user password' })
  @ApiBody({
    description: 'Password update payload',
    schema: {
      example: {
        oldPassword: 'OldPassword@123',
        newPassword: 'NewPassword@123',
        confirmPassword: 'NewPassword@123',
      },
    },
  })
  @ApiOkResponse({
    description: 'Password updated successfully.',
    schema: {
      example: {
        message: 'Password updated successfully',
      },
    },
  })
  updatePassword(
    @CurrentUser() user: UserDocument,
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(user, updatePasswordDto);
  }
}
