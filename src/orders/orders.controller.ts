import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  postOrder(@Body() body: CreateOrderDto) {
    return this.ordersService.createOrder(body);
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
}
