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
import { User } from 'src/core/domain/user/user.domain';
import MySQLSequelizeRoleEntity from '../role/role-mysql-sequelize.entity';
import MySQLSequelizePrivilegeEntity from '../privilege/privilege-mysql-sequelize.entity';
import MySQLSequelizeTransactionEntity from '../transaction/transaction-mysql-sequelize.entity';
import MySQLSequelizeUserPrivilegeEntity from '../user-privilege/user-privilege-mysql-sequelize.entity';
import MySQLSequelizeBlogEntity from '../blog/blog-mysql-sequelize.entity';
import MySQLSequelizeCourseEntity from '../course/course-mysql-sequelize.entity';
import MySQLSequelizeUserCourseEntity from '../user-course/user-course-mysql-sequelize.entity';

@Table({ tableName: 'user', modelName: 'user' })
class MySQLSequelizeUserEntity extends Model implements User {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  phone: string;

  @IsEmail
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
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

  @HasMany(() => MySQLSequelizeBlogEntity, 'userId')
  blogs: MySQLSequelizeBlogEntity[];

  @BelongsToMany(
    () => MySQLSequelizeCourseEntity,
    () => MySQLSequelizeUserCourseEntity,
  )
  courses: MySQLSequelizeCourseEntity[];
}

export default MySQLSequelizeUserEntity;
