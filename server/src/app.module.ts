import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MailService } from './modules/mail/mail.service';
import { CoursesModule } from './modules/courses/courses.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 3000, // 3 second
        limit: 10,
      },
      {
        name: 'long',
        ttl: 1000 * 30, // 30 minute
        limit: 100,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    }),
    CacheModule.register({
      ttl: 1000 * 60 * 3,
      max: 100,
      isGlobal: true,
      store: 'memory',
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    AnalyticsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [
    MailService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
