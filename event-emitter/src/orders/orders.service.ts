import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateOrder } from './dto/create-order.dto';
import { OrderCreatedEvent } from './events/order-created.event';

@Injectable()
export class OrdersService {
  constructor(private eventEmitter: EventEmitter2) {}

  createOrder(order: CreateOrder) {
    const event = new OrderCreatedEvent(order.name, order.description);
    this.eventEmitter.emit('order.created', event);
  }
}
