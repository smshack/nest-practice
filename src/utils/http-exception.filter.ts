import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    InternalServerErrorException,
    Inject,
    Logger,
    LoggerService,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
   
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(Logger) private readonly logger: LoggerService) {}
   
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const res = ctx.getResponse<Response>();
      const req = ctx.getRequest<Request>();
   
      this.logger.error({
        url: req.url,
        exception,
      });
   
      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        const response = exception.getResponse();
   
        res.status(status).json(response);
      } else {
        exception = new InternalServerErrorException();
        const status = exception.getStatus();
        const response = exception.getResponse();
   
        res.status(status).json(response);
      }
    }
  }