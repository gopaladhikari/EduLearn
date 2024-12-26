import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { JwtGuard } from './guards/jwt-auth.guard';
import type { UserDocument } from 'src/modules/users/entities/user.entity';
import type { Response } from 'express';

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
}
