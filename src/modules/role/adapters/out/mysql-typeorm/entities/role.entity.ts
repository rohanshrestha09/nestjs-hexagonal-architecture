import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';
import { Role } from 'src/modules/role/domain/role.domain';
import { UserEntity } from 'src/modules/user/adapters/out/mysql-typeorm/entities/user.entity';

@Entity('role')
export class RoleEntity extends BaseEntity implements Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'enum', enum: ROLE })
  name: ROLE;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
