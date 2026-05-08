import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/order-created.event';

@Injectable()
export class OrderCreatedListener {
  @OnEvent('order.created')
  handleOrsweCreated(event: OrderCreatedEvent) {
    console.log('Created Order: ', event);
  }
}
