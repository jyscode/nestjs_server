import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { User } from './decorator/users.decorator';
import { UsersModel } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  postUser(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.createUser({
      nickname,
      email,
      password,
    });
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  getUser(@User() user: UsersModel) {
    return this.usersService.getMe(user.email);
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(+id, body);
  }
  @Patch('order/:id')
  updateUserOrder(@Param('id') id: string, @Body('orderid') orderid: number) {
    return this.usersService.updateUserOrder(+id, orderid);
  }
}
