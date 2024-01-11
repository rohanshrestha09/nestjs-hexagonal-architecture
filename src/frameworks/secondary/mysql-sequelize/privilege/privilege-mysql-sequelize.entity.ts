import {
  Model,
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { Privilege } from 'src/core/domain/privilege/privilege.domain';
import MySQLSequelizeUserEntity from '../user/user-mysql-sequelize.entity';
import MySQLSequelizeUserPrivilegeEntity from '../user-privilege/user-privilege-mysql-sequelize.entity';

@Table({ tableName: 'privilege', modelName: 'privilege' })
class MySQLSequelizePrivilegeEntity extends Model implements Privilege {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({ type: DataType.DATE, allowNull: false })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(
    () => MySQLSequelizeUserEntity,
    () => MySQLSequelizeUserPrivilegeEntity,
  )
  users: MySQLSequelizeUserEntity[];
}

export default MySQLSequelizePrivilegeEntity;
