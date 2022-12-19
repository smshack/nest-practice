import { Module, ValidationPipe, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';  // 추가
import { AppController } from './app.controller';
import { BrandModule } from './brand/brand.module';
import { LoggerMiddleware } from '@src/middlewares/logger.middleware';
import { HttpExceptionFilter } from '@src/utils/http-exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
 
@Module({
  imports: [
    ConfigModule.forRoot({  // 추가
      isGlobal: true,  // 전역으로 사용
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    BrandModule,
    CommonModule,
  ],
    
  controllers: [AppController],
  providers: [
    Logger,  // 추가
    {
      provide: APP_PIPE,  // 추가
      useClass: ValidationPipe,  // 추가
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}