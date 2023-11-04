import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersModel } from './entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersModel)
    private readonly ordersRepository: Repository<OrdersModel>,
  ) {}

  async createOrder(body: CreateOrderDto) {
    return this.ordersRepository.create(body);
  }

  async getOrders() {
    return this.ordersRepository.find();
  }
}
