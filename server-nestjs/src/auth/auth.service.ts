import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';
import type { UserDocument } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import type { Types } from 'mongoose';

export type JwtPayload = {
  _id: Types.ObjectId;
  email: string;
  phoneNumber: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateJwtToken(user: UserDocument) {
    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
    });
    return token;
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = (await this.users.getUser({
        email,
      })) as UserDocument;

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid)
        throw new BadRequestException('Invalid email or password');
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(user: UserDocument, response: Response) {
    const date = new Date();
    date.setMilliseconds(date.getTime() + 60 * 60 * 24 * 7 * 1000);

    const accessToken = this.generateJwtToken(user);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: date,
    });

    return user;
  }

  logout(response: Response) {
    response.clearCookie('access_token');
    return {
      status: 'ok',
      message: 'You have been logged out successfully',
    };
  }
}
