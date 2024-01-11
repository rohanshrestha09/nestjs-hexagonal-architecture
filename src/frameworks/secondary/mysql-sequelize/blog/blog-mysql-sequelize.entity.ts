import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Blog } from 'src/core/domain/blog/blog.domain';
import MySQLSequelizeUserEntity from '../user/user-mysql-sequelize.entity';
import MySQLSequelizeCourseEntity from '../course/course-mysql-sequelize.entity';
import MySQLSequelizeCourseBlogEntity from '../course-blog/course-blog-mysql-sequelize.entity';

@Table({ tableName: 'blog', modelName: 'blog' })
class MySQLSequelizeBlogEntity extends Model implements Blog {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  slug: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @Column({ type: DataType.DATE, allowNull: false })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  @UpdatedAt
  updatedAt: Date;

  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => MySQLSequelizeUserEntity, 'userId')
  user: MySQLSequelizeUserEntity;

  @BelongsToMany(
    () => MySQLSequelizeCourseEntity,
    () => MySQLSequelizeCourseBlogEntity,
  )
  courses: MySQLSequelizeCourseEntity[];
}

export default MySQLSequelizeBlogEntity;
