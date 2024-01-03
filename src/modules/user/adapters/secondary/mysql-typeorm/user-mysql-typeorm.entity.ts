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
import { MySQLTypeORMRoleEntity } from 'src/modules/role/adapters/secondary/mysql-typeorm/role-mysql-typeorm.entity';
import { MySQLTypeORMPrivilegeEntity } from 'src/modules/privilege/adapters/secondary/mysql-typeorm/privilege-mysql-typeorm.entity';

@Entity('user')
export class MySQLTypeORMUserEntity extends BaseEntity implements User {
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

  @Column()
  roleId: number;

  @ManyToOne(() => MySQLTypeORMRoleEntity, (role) => role.users, {
    nullable: false,
  })
  role: MySQLTypeORMRoleEntity;

  @ManyToMany(() => MySQLTypeORMPrivilegeEntity, (privilege) => privilege.users)
  @JoinTable()
  privileges: MySQLTypeORMPrivilegeEntity[];
}
