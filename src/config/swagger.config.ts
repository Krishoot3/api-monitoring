import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('REST API')
  .setDescription('REST API description')
  .setVersion('1.0')
  .build();
