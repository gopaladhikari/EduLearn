import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { JwtGuard } from './guards/jwt-auth.guard';
import type { UserDocument } from 'src/modules/users/entities/user.entity';
import type { Response } from 'express';
import { ConfirmForgotPasswordDto } from './dto/confirm-forgot-password.dto';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiSecurity('x-api-key')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user and returns a JWT token in cookies.',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
  })
  @ApiBody({
    description: 'User login credentials',
    type: LoginDto,
  })
  login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'User logout',
    description:
      'Logs out a user by clearing the JWT token from cookies.',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged out successfully.',
  })
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @Post('forgot-password')
  @ApiOperation({
    summary: 'Request password reset',
    description: "Sends a password reset link to the user's email.",
  })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset link sent successfully.',
  })
  requestForgotPassword(@Body('email') email: string) {
    return this.authService.requestForgotPassword(email);
  }

  @Patch('forgot-password/:token')
  @ApiOperation({
    summary: 'Confirm password reset',
    description:
      'Resets the password using a token received in email.',
  })
  @ApiBody({
    type: ConfirmForgotPasswordDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully.',
  })
  confirmForgotPassword(
    @Param('token') token: string,
    @Body(ValidationPipe) body: ConfirmForgotPasswordDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.confirmForgotPassword(
      token,
      body,
      response,
    );
  }

  @Patch('verify-email/:token')
  @ApiOperation({
    summary: 'Verify email',
    description: 'Verifies user email using the token sent to email.',
  })
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully.',
  })
  verifyEmail(
    @Body('email') email: string,
    @Param('token') token: string,
  ) {
    return this.authService.verifyEmail(email, token);
  }
}
