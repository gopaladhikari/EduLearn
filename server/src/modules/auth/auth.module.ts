import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UsersModule } from 'src/modules/users/users.module';
import { MailService } from '../mail/mail.service';
import { GoogleStrategyAdmin } from './strategies/google-strategy';
import { GoogleStrategyUser } from './strategies/google-strategy';

@Module({
  imports: [UsersModule, JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    MailService,
    GoogleStrategyAdmin,
    GoogleStrategyUser,
  ],
})
export class AuthModule {}
