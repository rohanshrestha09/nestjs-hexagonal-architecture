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
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';
import { UserEntity } from 'src/modules/user/adapters/out/mysql-sequelize/entities/user.entity';

@Table({ tableName: 'role', modelName: 'role' })
export class RoleEntity extends Model implements Role {
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

  @Column({ type: DataType.DATE })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE })
  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => UserEntity, 'roleId')
  users: UserEntity[];
}

export default RoleEntity;
