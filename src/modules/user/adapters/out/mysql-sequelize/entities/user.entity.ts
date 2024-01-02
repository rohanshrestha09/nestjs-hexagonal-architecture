import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  IsEmail,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/domain/user.domain';
import { RoleEntity } from 'src/modules/role/adapters/out/mysql-sequelize/entities/role.entity';
import { PrivilegeEntity } from 'src/modules/privilege/adapters/out/mysql-sequelize/entities/privilege.entity';
import { TransactionEntity } from 'src/modules/transaction/adapters/out/mysql-sequelize/entities/transaction.entity';
import { UserPrivilege } from 'src/modules/user-privilege/adapters/out/mysql-sequelize/entities/user-privilege.entity';

@Table({ tableName: 'user', modelName: 'user' })
export class UserEntity extends Model implements User {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @IsEmail
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.DATE, allowNull: false })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  @UpdatedAt
  updatedAt: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId: number;

  @BelongsTo(() => RoleEntity, 'roleId')
  role: RoleEntity;

  @BelongsToMany(() => PrivilegeEntity, () => UserPrivilege)
  privileges: PrivilegeEntity[];

  @HasMany(() => TransactionEntity, 'userId')
  transactions: TransactionEntity[];
}

export default UserEntity;
