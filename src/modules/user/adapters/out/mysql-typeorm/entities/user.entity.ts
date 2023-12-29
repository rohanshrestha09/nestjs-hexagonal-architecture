import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from 'src/modules/user/domain/user.domain';
import { RoleEntity } from 'src/modules/role/adapters/out/mysql-typeorm/entities/role.entity';
import { PrivilegeEntity } from 'src/modules/privilege/adapters/out/mysql-typeorm/entites/privilege.entity';

@Entity('user')
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => RoleEntity, (role) => role.users, { nullable: false })
  role: RoleEntity;

  @ManyToMany(() => PrivilegeEntity, (privilege) => privilege.users)
  @JoinTable()
  privileges: PrivilegeEntity[];
}
