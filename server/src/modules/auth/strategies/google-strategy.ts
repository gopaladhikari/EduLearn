import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  type VerifyCallback,
  type Profile,
} from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { Role } from 'src/modules/users/entities/user.entity';

@Injectable()
export class GoogleStrategyAdmin extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback/admin',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = await this.auth.validateGoogleUser(
      profile,
      Role.Admin,
    );

    done(null, user);
  }
}

export class GoogleStrategyUser extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback/users',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = await this.auth.validateGoogleUser(
      profile,
      Role.User,
    );

    done(null, user);
  }
}
