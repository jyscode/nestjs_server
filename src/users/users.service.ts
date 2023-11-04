import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async createUser(user: Pick<UsersModel, 'nickname' | 'email' | 'password'>) {
    const nicknameExists = await this.usersRepository.exist({
      where: {
        nickname: user.nickname,
      },
    });

    if (nicknameExists) {
      throw new BadRequestException('이미 존재하는 nickname입니다.');
    }

    const emailExists = await this.usersRepository.exist({
      where: {
        email: user.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('이미 존재하는 email입니다.');
    }
    const userObject = this.usersRepository.create({
      nickname: user.nickname,
      email: user.email,
      password: user.password,
      apikey: '',
      apisecret: '',
      account: 0,
      accountb: 0,
    });

    const newUser = await this.usersRepository.save(userObject);

    return newUser;
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
  async getMe(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        nickname: true,
        email: true,
        account: true,
        accountb: true,
        apikey: true,
        apisecret: true,
        orderid: true,
      },
    });
  }

  async updateUser(id: number, body: UpdateUserDto) {
    return this.usersRepository.update(id, body);
  }
  async updateUserOrder(id: number, orderid: number) {
    const body = {
      orderid: orderid,
    };
    return this.usersRepository.update(id, body);
  }
}
