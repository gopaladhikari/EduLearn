import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { site } from './config/site';
import { XApiKeyInterceptor } from './interceptors/x-api-key.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new XApiKeyInterceptor());
  app.enableCors({
    origin: site.domain,
    credentials: true,
    optionsSuccessStatus: 204,
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

  const config = new DocumentBuilder()
    .setTitle('📚 EduLearn API')
    .setDescription(
      '📚 EduLearn Platform, an online teaching and learning hub where educators can share their knowledge with students from around the globe. This platform empowers teachers to create, manage, and sell their courses while offering students a seamless experience to learn and grow at their own pace.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API Key required to access the endpoints',
      },
      'x-api-key',
    )
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
