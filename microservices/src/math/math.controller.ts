import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MathService } from './math.service';
import { type Values } from './Values';

@Controller('math')
export class MathController {
  constructor(private mathService: MathService) {}

  @MessagePattern('add')
  add(values: Values) {
    return this.mathService.add(values);
  }

  @MessagePattern('multi')
  multi(values: Values) {
    return this.mathService.multi(values);
  }

  @MessagePattern('sub')
  sub(values: Values) {
    return this.mathService.sub(values);
  }

  @MessagePattern('divide')
  divide(values: Values) {
    return this.mathService.divide(values);
  }
}
