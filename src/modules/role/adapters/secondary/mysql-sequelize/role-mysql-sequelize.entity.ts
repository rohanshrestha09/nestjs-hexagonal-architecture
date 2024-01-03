import {
  Model,
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Role } from 'src/modules/role/domain/role.domain';
import { MySQLSequelizeUserEntity } from 'src/modules/user/adapters/secondary/mysql-sequelize/user-mysql-sequelize.entity';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@Table({ tableName: 'role', modelName: 'role' })
export class MySQLSequelizeRoleEntity extends Model implements Role {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.ENUM,
    unique: true,
    values: Object.values(ROLE),
    allowNull: false,
  })
  name: ROLE;

  @Column({ type: DataType.DATE, allowNull: false })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => MySQLSequelizeUserEntity, 'roleId')
  users: MySQLSequelizeUserEntity[];
}

export default MySQLSequelizeRoleEntity;
