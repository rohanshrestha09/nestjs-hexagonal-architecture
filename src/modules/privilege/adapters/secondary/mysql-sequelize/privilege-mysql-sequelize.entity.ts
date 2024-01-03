import {
  Model,
  Table,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { Privilege } from 'src/modules/privilege/domain/privilege.domain';
import { MySQLSequelizeUserEntity } from 'src/modules/user/adapters/secondary/mysql-sequelize/user-mysql-sequelize.entity';
import { MySQLSequelizeUserPrivilegeEntity } from 'src/modules/user-privilege/adapters/secondary/mysql-sequelize/user-privilege-mysql-sequelize.entity';

@Table({ tableName: 'privilege', modelName: 'privilege' })
export class MySQLSequelizePrivilegeEntity extends Model implements Privilege {
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
