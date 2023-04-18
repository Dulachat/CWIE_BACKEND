import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('API');
  app.use(cookieParser());
  app.enableCors(
    {
      origin: "http://localhost:3000",
      credentials: true,
      allowedHeaders: "*"
    }
  );
  // app.enableCors({ allowedHeaders: "*", origin: "*", credentials: true });
  await app.listen(3800);
}
bootstrap();
