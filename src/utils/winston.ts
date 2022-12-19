import { utilities, WinstonModule } from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { transports, format } from 'winston';
 
const env = process.env.NODE_ENV;
const logDir = 'logs'; // log 파일을 관리할 폴더
 
const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30, // 30일치 로그 파일 저장
    zippedArchive: true, // 로그가 쌓이면 압축 저장
  };
};
 
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new transports.Console({
      level: env === 'production' ? 'http' : 'silly',
      // production 환경은 http, development 환경은 모든 단계 로깅
      format:
        env === 'production'
          ? // production은 리소스를 아끼기 위해 simple 포맷 사용
            format.simple()
          : format.combine(
              format.timestamp(),
              format.ms(),
              utilities.format.nestLike('appName', {
                prettyPrint: true,
                colors: true,
              })
            ),
    }),
 
    // info, warn, error 로그는 파일로 관리
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
});