import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { CorsOptions } from 'cors';
import { PinoLogger } from 'util/logger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.use(cookieParser());
  const allowedOrigins: string[] =
    process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];
  const corsOptions: CorsOptions = {
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
  };
  app.use(cors(corsOptions));
  await app.listen(3800);
}
bootstrap();
