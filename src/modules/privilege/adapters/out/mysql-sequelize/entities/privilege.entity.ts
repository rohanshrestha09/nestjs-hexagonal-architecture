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
import { UserEntity } from 'src/modules/user/adapters/out/mysql-sequelize/entities/user.entity';
import { UserPrivilege } from 'src/modules/user-privilege/adapters/out/mysql-sequelize/entities/user-privilege.entity';

@Table({ tableName: 'privilege', modelName: 'privilege' })
export class PrivilegeEntity extends Model implements Privilege {
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

  @BelongsToMany(() => UserEntity, () => UserPrivilege)
  users: UserEntity[];
}

export default PrivilegeEntity;
