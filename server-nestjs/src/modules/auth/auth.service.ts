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
      throw new BadRequestException('Invalid email or password');
    return user;
  }

  login(user: UserDocument, response: Response) {
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
      data: user,
      message: 'User logged in successfully',
    };
  }

  logout(response: Response) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:
        process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return {
      message: 'User logged out successfully',
      data: null,
    };
  }

  async requestForgotPassword(email: string) {
    const user = await this.users.getUser({ email });

    if (!user) throw new NotFoundException('User not found');

    const accessToken = this.generateJwtToken(user);

    const data = await this.mail.sendRequestForgotPasswordMail(
      user.fullName,
      email,
      accessToken,
    );
    user.jwtToken = accessToken;
    await user.save();
    return {
      message: 'Password reset link sent successfully',
      data,
    };
  }

  async confirmForgotPassword(
    token: string,
    { email, password, confirmPassword }: ConfirmForgotPasswordDto,
    response: Response,
  ) {
    const user = await this.users.getUser({ email });

    if (!user) throw new NotFoundException('User not found');

    if (user.jwtToken !== token)
      throw new BadRequestException('Invalid token');

    if (password !== confirmPassword)
      throw new BadRequestException(
        'Passsowrd and confirm password do not match',
      );

    user.password = password;
    user.jwtToken = undefined;
    await user.save();
    response.clearCookie('access_token', {
      domain:
        process.env.NODE_ENV === 'production'
          ? '.gopal-adhikari.com.np'
          : 'localhost',
    });
    return {
      message: 'Password reset successfully',
      data: user,
    };
  }

  async verifyEmail(email: string, token: string) {
    try {
      if (!email) throw new BadRequestException('Email is required');

      const user = await this.users.getUser({ email });

      if (!user) throw new NotFoundException('User not found');

      if (user.jwtToken !== token)
        throw new BadRequestException('Invalid token');

      user.verified = true;
      user.jwtToken = undefined;
      await user.save();
      return {
        message: 'Email verified successfully',
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException(error.message);
    }
  }
}
