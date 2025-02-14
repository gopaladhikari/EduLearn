import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import type { UserDocument } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import { MailService } from '../mail/mail.service';
import type { Types } from 'mongoose';
import type { ConfirmForgotPasswordDto } from './dto/confirm-forgot-password.dto';
import type { JwtPayload } from 'jsonwebtoken';
import type { ServiceReturnType } from 'src/interceptors/response.interceptor';
import { AUTH_MESSAGES, USERS_MESSAGES } from 'src/config/messages';

export interface Payload extends JwtPayload {
  _id: Types.ObjectId;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mail: MailService,
  ) {}

  generateJwtToken(user: UserDocument) {
    const payload: Payload = {
      _id: user._id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      expiresIn: '7d',
    });
    return token;
  }

  async verifyUser(email: string, password: string) {
    const user = await this.users.getUser({
      email,
    });

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new BadRequestException(
        USERS_MESSAGES.INVALID_CREDENTIALS,
      );
    return user;
  }

  login(user: UserDocument, response: Response): ServiceReturnType {
    const date = new Date();
    date.setMilliseconds(date.getTime() + 60 * 60 * 24 * 7 * 1000);

    const accessToken = this.generateJwtToken(user);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:
        process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      expires: date,
    });

    return {
      data: {
        user,
        accessToken,
      },
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
    };
  }

  logout(response: Response): ServiceReturnType {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:
        process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return {
      message: AUTH_MESSAGES.LOGOUT_SUCCESS,
      data: null,
    };
  }

  async requestForgotPassword(
    email: string,
  ): Promise<ServiceReturnType> {
    const user = await this.users.getUser({ email });

    if (!user)
      throw new NotFoundException(USERS_MESSAGES.INVALID_CREDENTIALS);

    const accessToken = this.generateJwtToken(user);

    const data = await this.mail.sendRequestForgotPasswordMail(
      user.fullName,
      email,
      accessToken,
    );

    user.forgotPasswordToken = accessToken;

    const expires = new Date();

    expires.setDate(expires.getDate() + 7);

    user.forgotPasswordTokenExpires = expires;

    await user.save();

    return {
      message: `Password reset link sent successfully to ${user.email} email`,
      data,
    };
  }

  async confirmForgotPassword(
    token: string,
    { email, password, confirmPassword }: ConfirmForgotPasswordDto,
    response: Response,
  ): Promise<ServiceReturnType> {
    if (password !== confirmPassword)
      throw new BadRequestException('Passwords do not match');

    try {
      const user = await this.users.getUser({
        email,
        forgotPasswordTokenExpires: { $gt: new Date() },
        forgotPasswordToken: token,
      });

      if (!user)
        throw new NotFoundException(
          USERS_MESSAGES.INVALID_CREDENTIALS,
        );

      user.password = password;

      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpires = undefined;

      await user.save();

      response.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:
          process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });

      return {
        message: 'Password reset successfully',
        data: {
          id: user._id,
          email: user.email,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }

  async verifyEmail(
    email: string,
    token: string,
  ): Promise<ServiceReturnType> {
    try {
      if (!email) throw new BadRequestException('Email is required');

      const user = await this.users.getUser({ email });

      if (!user)
        throw new NotFoundException(
          USERS_MESSAGES.INVALID_CREDENTIALS,
        );

      if (user.jwtToken !== token)
        throw new BadRequestException(
          AUTH_MESSAGES.INVALID_JWT_TOKEN,
        );

      user.verified = true;
      user.jwtToken = undefined;
      await user.save();
      return {
        message: 'Email verified successfully',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }
}
