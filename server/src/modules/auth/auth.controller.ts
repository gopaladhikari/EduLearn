import {
  Body,
  Controller,
  Get,
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
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { AuthSwagger } from 'src/config/constants/auth.swagger';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Public } from 'src/interceptors/x-api-key.interceptor';

@ApiSecurity('x-api-key')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiOperation(AuthSwagger.login.operation)
  @ApiResponse(AuthSwagger.login.okResponse)
  @ApiBody(AuthSwagger.login.body)
  login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  @ApiOperation(AuthSwagger.logout.operation)
  @ApiResponse(AuthSwagger.logout.okResponse)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @Post('forgot-password')
  @ApiOperation(AuthSwagger.forgotPassword.operation)
  @ApiBody(AuthSwagger.forgotPassword.body)
  @ApiResponse(AuthSwagger.forgotPassword.okResponse)
  requestForgotPassword(@Body('email') email: string) {
    return this.authService.requestForgotPassword(email);
  }

  @Patch('forgot-password/:token')
  @ApiOperation(AuthSwagger.confirmForgotPassword.operation)
  @ApiBody(AuthSwagger.confirmForgotPassword.body)
  @ApiResponse(AuthSwagger.confirmForgotPassword.okResponse)
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
  @ApiOperation(AuthSwagger.verifyEmail.operation)
  @ApiBody(AuthSwagger.verifyEmail.body)
  @ApiResponse(AuthSwagger.verifyEmail.okResponse)
  verifyEmail(
    @Body('email') email: string,
    @Param('token') token: string,
  ) {
    return this.authService.verifyEmail(email, token);
  }

  @Public()
  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  googleLogin() {}

  @Public()
  @Get('/google/callback')
  @ApiExcludeEndpoint()
  @UseGuards(GoogleAuthGuard)
  googleCallback(
    @CurrentUser() user: UserDocument,
    @Res() res: Response,
  ) {
    this.authService.googleCallback(user, res);
  }
}
