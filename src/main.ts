import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@src/utils/swagger'; 
import { winstonLogger } from '@src/utils/winston';
import * as express from 'express';
 
async function bootstrap() {
  const options: NestApplicationOptions = {
    cors: true,  // CORS 설정
    logger: winstonLogger,
  };
 
  const app = await NestFactory.create(AppModule, options);
 
  // 전역으로 Request 검증
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.use(express.json({ limit: '5mb' }));  // request 용량 제한
  app.use(express.urlencoded({ limit: '5mb', extended: true }));
  app.enableCors();  // CORS 설정
 
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const NODE_ENV = configService.get<string>('NODE_ENV');

  setupSwagger(app);  // 추가

  await app.listen(PORT);
 
  process.send && process.send('ready');  // pm2 ready 상태 확인
}
bootstrap();