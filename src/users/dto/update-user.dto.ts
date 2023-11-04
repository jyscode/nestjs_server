import { PartialType, PickType } from '@nestjs/mapped-types';
import { UsersModel } from '../entities/users.entity';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(
  PickType(UsersModel, ['apikey', 'apisecret', 'account', 'accountb']),
) {
  @Type(() => Number)
  account: number;

  @Type(() => Number)
  accountb?: number;
}
