import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors(
    {
      origin:`*`,
      credentials: true,
      allowedHeaders:"*"
    }
  );
  // await app.listen(3860);
  await app.listen(3800);
}
bootstrap();
