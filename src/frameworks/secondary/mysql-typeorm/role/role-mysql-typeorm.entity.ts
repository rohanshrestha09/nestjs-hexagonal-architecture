import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Role } from 'src/core/domain/role/role.domain';
import { MySQLTypeORMUserEntity } from '../user/user-mysql-typeorm.entity';
import { ROLE } from 'src/common/enums/role.enum';

@Entity('role')
export class MySQLTypeORMRoleEntity extends BaseEntity implements Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'enum', enum: ROLE })
  name: ROLE;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MySQLTypeORMUserEntity, (user) => user.role)
  users: MySQLTypeORMUserEntity[];
}
