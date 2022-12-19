import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
 
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('API Docs description')
    .setVersion('1.0.0')
    .build();
 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}