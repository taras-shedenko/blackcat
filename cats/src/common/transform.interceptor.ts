import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(
    private appService: AppService,
    private catsService: CatsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map(<T>(data: T) => ({ data: data ?? null })));
  }
}
