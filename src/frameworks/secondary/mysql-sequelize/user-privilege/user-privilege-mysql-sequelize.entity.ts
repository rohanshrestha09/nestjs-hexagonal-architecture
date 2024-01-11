import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import MySQLSequelizeUserEntity from '../user/user-mysql-sequelize.entity';
import MySQLSequelizePrivilegeEntity from '../privilege/privilege-mysql-sequelize.entity';

@Table({ tableName: 'user_privilege', modelName: 'user_privilege' })
class MySQLSequelizeUserPrivilegeEntity extends Model {
  @ForeignKey(() => MySQLSequelizeUserEntity)
  @Column
  userId: string;

  @ForeignKey(() => MySQLSequelizePrivilegeEntity)
  @Column
  privilegeId: number;
}

export default MySQLSequelizeUserPrivilegeEntity;
