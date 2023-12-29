import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/modules/user/adapters/out/mysql-typeorm/entities/user.entity';
import { Privilege } from 'src/modules/privilege/domain/privilege.domain';

@Entity()
export class PrivilegeEntity extends BaseEntity implements Privilege {
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

  @ManyToMany(() => UserEntity, (user) => user.privileges)
  users: UserEntity[];
}
