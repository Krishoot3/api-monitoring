import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import * as Sentry from '@sentry/node';
import { sentryConfig } from './config/sentry.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  Sentry.init(sentryConfig);

  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
