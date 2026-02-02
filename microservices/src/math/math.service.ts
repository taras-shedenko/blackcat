import { Injectable } from '@nestjs/common';
import { type Values } from './Values';

@Injectable()
export class MathService {
  add(values: Values) {
    return values.v1 + values.v2;
  }

  multi(values: Values) {
    return values.v1 * values.v2;
  }

  sub(values: Values) {
    return values.v1 - values.v2;
  }

  divide(values: Values) {
    return values.v1 / values.v2;
  }
}
