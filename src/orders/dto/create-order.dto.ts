import { OrdersModel } from './../entities/orders.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreateOrderDto extends PickType(OrdersModel, [
  'user',
  'pdname',
  'pdno',
  'strategy',
  'amount',
  'type',
]) {}
