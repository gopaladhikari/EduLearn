import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @CurrentUser() user,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response);
  }
}
