import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) throw new BadRequestException('Validation failed');
    return parsedValue;
  }
}
