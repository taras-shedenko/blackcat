import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`GLOBAL: ${req.method} ${req.originalUrl}`);
    next();
  });
  await app.listen(process.env.PORT ?? 3000);
}
/* eslint-disable-next-line */
bootstrap();
