import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  type VerifyCallback,
  type Profile,
} from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import {
  AuthProvider,
  Role,
} from 'src/modules/users/entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = await this.auth.validateGoogleUser({
      email: profile.emails[0].value,
      fullName: `${profile.name.givenName} ${profile.name.familyName}`,
      role: Role.Admin,
      providerId: profile.id,
      status: 'active',
      provider: AuthProvider.Google,
      avatar: {
        url: profile.photos[0].value,
      },
      verified: profile.emails[0].verified,
    });

    done(null, user);
  }
}
