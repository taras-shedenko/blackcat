import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  Type,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppService } from '../app.service';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private static typesNotToValidate: Type[] = [
    Number,
    String,
    Boolean,
    Object,
    Array,
  ];

  constructor(
    private appService: AppService,
    private catsService: CatsService,
  ) {}

  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || this.notToValidate(metatype)) return value;
    const instance = plainToInstance(metatype, value) as object;
    const errors = await validate(instance);
    if (errors.length) throw new BadRequestException('Validation failed');
    return value;
  }

  notToValidate(metatype: Type) {
    return ValidationPipe.typesNotToValidate.includes(metatype);
  }
}
