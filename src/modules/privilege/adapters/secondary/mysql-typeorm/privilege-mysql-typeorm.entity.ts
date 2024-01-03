import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Privilege } from 'src/modules/privilege/domain/privilege.domain';
import { MySQLTypeORMUserEntity } from 'src/modules/user/adapters/secondary/mysql-typeorm/user-mysql-typeorm.entity';

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
