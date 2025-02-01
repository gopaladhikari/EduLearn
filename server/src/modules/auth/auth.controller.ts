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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @Post('forgot-password')
  requestForgotPassword(@Body('email') email: string) {
    return this.authService.requestForgotPassword(email);
  }

  @Patch('forgot-password/:token')
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
  verifyEmail(
    @Body('email') email: string,
    @Param('token') token: string,
  ) {
    return this.authService.verifyEmail(email, token);
  }
}
