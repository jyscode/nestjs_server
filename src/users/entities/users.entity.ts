import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { IsEmail, IsInt, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import { OrdersModel } from 'src/orders/entities/orders.entity';

@Entity()
export class UsersModel extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
    length: 20,
  })
  @IsString()
  @Length(1, 20)
  nickname: string;
  @Column({
    unique: true,
  })
  @IsString()
  @IsEmail()
  email: string;
  @Column()
  @IsString()
  @Length(8, 12)
  @Exclude({
    toPlainOnly: true,
  })
  password: string;
  @Column({
    enum: Object.values(RolesEnum),
    default: RolesEnum.USER,
  })
  role: RolesEnum;
  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  apikey: string;
  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  apisecret: string;
  @Column()
  @IsInt()
  @Exclude({
    toPlainOnly: true,
  })
  account: number;
  @Column({
    default: 0,
  })
  @IsInt()
  @Exclude({ toPlainOnly: true })
  accountb: number;

  @Column({
    default: 0,
  })
  @IsInt()
  orderid: number;

  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];

  @OneToMany(() => OrdersModel, (order) => order.user)
  orders: OrdersModel[];
}
