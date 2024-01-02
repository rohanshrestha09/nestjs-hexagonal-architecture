import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { UserEntity } from 'src/modules/user/adapters/out/mysql-sequelize/entities/user.entity';
import { PrivilegeEntity } from 'src/modules/privilege/adapters/out/mysql-sequelize/entities/privilege.entity';

@Table
export class UserPrivilege extends Model {
  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @ForeignKey(() => PrivilegeEntity)
  @Column
  privilegeId: number;
}

export default UserPrivilege;
