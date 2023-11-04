import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeEnum } from '../const/type.const';
import { BaseModel } from 'src/common/entity/base.entity';
import { UsersModel } from 'src/users/entities/users.entity';

@Entity()
export class OrdersModel extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    enum: Object.values(TypeEnum),
  })
  type: TypeEnum;
  @Column()
  strategy: number;
  @Column()
  pdno: number;
  @Column()
  pdname: string;
  @Column()
  amount: number;
  // ManyToOne (함수 상대의 타입 반환, 연결할 상대에서 자신을 가져올수 있는 부분)
  @ManyToOne(() => UsersModel, (user) => user.orders, {
    nullable: false,
  })
  user: UsersModel;
}
