import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { MySQLSequelizePrivilegeEntity } from 'src/modules/privilege/adapters/secondary/mysql-sequelize/privilege-mysql-sequelize.entity';
import { MySQLSequelizeUserEntity } from 'src/modules/user/adapters/secondary/mysql-sequelize/user-mysql-sequelize.entity';

@Table({ tableName: 'user_privilege', modelName: 'user_privilege' })
export class MySQLSequelizeUserPrivilegeEntity extends Model {
  @ForeignKey(() => MySQLSequelizeUserEntity)
  @Column
  userId: string;

  @ForeignKey(() => MySQLSequelizePrivilegeEntity)
  @Column
  privilegeId: number;
}

export default MySQLSequelizeUserPrivilegeEntity;
