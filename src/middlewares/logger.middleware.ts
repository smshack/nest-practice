import { Inject, Injectable, Logger, LoggerService, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`${method} ${originalUrl} ${statusCode} ip(${ip})`);
    });

    next();
  }
}
