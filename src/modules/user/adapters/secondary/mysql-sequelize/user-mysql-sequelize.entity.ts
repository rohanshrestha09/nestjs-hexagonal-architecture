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
import { MySQLSequelizePrivilegeEntity } from 'src/modules/privilege/adapters/secondary/mysql-sequelize/privilege-mysql-sequelize.entity';
import { MySQLSequelizeRoleEntity } from 'src/modules/role/adapters/secondary/mysql-sequelize/role-mysql-sequelize.entity';
import { MySQLSequelizeTransactionEntity } from 'src/modules/transaction/adapters/secondary/mysql-sequelize/transaction-mysql-sequelize.entity';
import { MySQLSequelizeUserPrivilegeEntity } from 'src/modules/user-privilege/adapters/secondary/mysql-sequelize/user-privilege-mysql-sequelize.entity';
import { User } from 'src/modules/user/domain/user.domain';

@Table({ tableName: 'user', modelName: 'user' })
export class MySQLSequelizeUserEntity extends Model implements User {
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

  @BelongsTo(() => MySQLSequelizeRoleEntity, 'roleId')
  role: MySQLSequelizeRoleEntity;

  @BelongsToMany(
    () => MySQLSequelizePrivilegeEntity,
    () => MySQLSequelizeUserPrivilegeEntity,
  )
  privileges: MySQLSequelizePrivilegeEntity[];

  @HasMany(() => MySQLSequelizeTransactionEntity, 'userId')
  transactions: MySQLSequelizeTransactionEntity[];
}

export default MySQLSequelizeUserEntity;
