import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MailService } from './modules/mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    }),

    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
