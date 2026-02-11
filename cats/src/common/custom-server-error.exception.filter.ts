import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomServerErrorException } from './custom-server-error.exception';
import { AppService } from '../app.service';
import { CatsService } from '../cats/cats.service';

@Catch(CustomServerErrorException)
export class CustomServerErrorExceptionFilter implements ExceptionFilter<CustomServerErrorException> {
  constructor(
    private appService: AppService,
    private catsService: CatsService,
  ) {}
  catch(exception: CustomServerErrorException, args: ArgumentsHost) {
    const httpArgs = args.switchToHttp();
    const req = httpArgs.getRequest<Request>();
    const res = httpArgs.getResponse<Response>();
    const status = exception.getStatus();
    const response = exception.getResponse() as object;

    res.status(status).json({
      ...response,
      url: req.originalUrl,
      timeStamp: new Date().toISOString(),
    });
  }
}
