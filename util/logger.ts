import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', // Adjust levels as needed
});

@Injectable()
export class PinoLogger implements LoggerService {
  warn(message: any, ...optionalParams: any[]) {
    logger.warn(message,optionalParams);
  }
  debug?(message: any) {
    logger.debug(message);
  }
  log(message: string, context?: string) {
    logger.info(message, context);
  }

  error(error: Error, context?: string) {
    logger.error(error, context);
  }
}