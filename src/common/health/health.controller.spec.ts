import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';
import * as appRootPath from 'app-root-path';
 
@Controller('health')
export class HealthController {
  KB = 1024;
  MB = 1024 * this.KB;
  GB = 1024 * this.MB;
 
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly mongooseHealth: MongooseHealthIndicator,
    private readonly config: ConfigService
  ) {}
 
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // 사용해야 할 다른 서버 상태 확인
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'), 
      
      // 전체 디스크 용량 95% 이상 사용시 unhealthy
      () => this.disk.checkStorage('storage', { path: appRootPath.path, thresholdPercent: 0.95 }),
      
      // memory heap 500MB 이상 사용시 unhealthy
      () => this.memory.checkHeap('memory_heap', 500 * this.MB), 
      
      // Resident Set Size 1GB 이상 사용시 unhealthy
      () => this.memory.checkRSS('memory_rss', 1 * this.GB),
      
      // Mongoose 연결 확인
      () => this.mongooseHealth.pingCheck('mongoDB'), 
    ]);
  }
}