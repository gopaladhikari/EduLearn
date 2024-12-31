import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import { site } from './config/constant';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors({
    origin: site.domain,
    credentials: true,
    optionsSuccessStatus: 204,
    preflightContinue: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
