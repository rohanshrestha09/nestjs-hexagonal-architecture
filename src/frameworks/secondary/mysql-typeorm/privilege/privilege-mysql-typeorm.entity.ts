import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Privilege } from 'src/core/domain/privilege/privilege.domain';
import { MySQLTypeORMUserEntity } from '../user/user-mysql-typeorm.entity';

@Entity('privilege')
export class MySQLTypeORMPrivilegeEntity
  extends BaseEntity
  implements Privilege
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => MySQLTypeORMUserEntity, (user) => user.privileges)
  users: MySQLTypeORMUserEntity[];
}
