import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Values } from './math/Values';

@Injectable()
export class AppService {
  constructor(@Inject('MATH') private clientProxy: ClientProxy) {}

  add(values: Values) {
    return this.clientProxy.send('add', values);
  }

  multi(values: Values) {
    return this.clientProxy.send('multi', values);
  }

  sub(values: Values) {
    return this.clientProxy.send('sub', values);
  }

  divide(values: Values) {
    return this.clientProxy.send('divide', values);
  }
}
