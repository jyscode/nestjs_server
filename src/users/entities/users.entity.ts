import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

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
  @OneToMany(() => PostsModel, (post) => post.author)
  posts: PostsModel[];
}
