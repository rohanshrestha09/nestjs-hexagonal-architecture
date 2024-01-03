import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Role } from 'src/modules/role/domain/role.domain';
import { MySQLTypeORMUserEntity } from 'src/modules/user/adapters/secondary/mysql-typeorm/user-mysql-typeorm.entity';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

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
