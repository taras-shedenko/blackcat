import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppService } from '../app.service';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private appService: AppService,
    private catsService: CatsService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log(`MODULE: ${req.method} ${req.originalUrl}`);
    next();
  }
}
