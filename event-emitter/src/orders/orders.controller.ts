import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrder } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post() createOrder(@Body() order: CreateOrder) {
    this.ordersService.createOrder(order);
  }
}
