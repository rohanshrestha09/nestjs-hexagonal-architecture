import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Course } from 'src/core/domain/course/course.domain';
import MySQLSequelizeBookEntity from '../book/book-mysql-sequelize.entity';
import MySQLSequelizeCourseBookEntity from '../course-book/course-book-mysql-sequelize.entity';
import MySQLSequelizeUserEntity from '../user/user-mysql-sequelize.entity';
import MySQLSequelizeUserCourseEntity from '../user-course/user-course-mysql-sequelize.entity';
import MySQLSequelizeBlogEntity from '../blog/blog-mysql-sequelize.entity';
import MySQLSequelizeCourseBlogEntity from '../course-blog/course-blog-mysql-sequelize.entity';
import { COURSE_STATUS } from 'src/common/enums/course.enum';

@Table({ tableName: 'course', modelName: 'course' })
class MySQLSequelizeCourseEntity extends Model implements Course {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  code: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.NUMBER, allowNull: false, validate: { min: 1 } })
  price: number;

  @Column({ type: DataType.NUMBER, allowNull: false, validate: { min: 1 } })
  offerPrice: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  })
  pages: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(COURSE_STATUS),
    defaultValue: COURSE_STATUS.PUBLISHED,
  })
  status: COURSE_STATUS;

  @Column({ type: DataType.DATE, allowNull: false })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(
    () => MySQLSequelizeBookEntity,
    () => MySQLSequelizeCourseBookEntity,
  )
  books: MySQLSequelizeBookEntity[];

  @BelongsToMany(
    () => MySQLSequelizeUserEntity,
    () => MySQLSequelizeUserCourseEntity,
  )
  users: MySQLSequelizeUserEntity[];

  @BelongsToMany(
    () => MySQLSequelizeBlogEntity,
    () => MySQLSequelizeCourseBlogEntity,
  )
  blogs: MySQLSequelizeBlogEntity[];
}

export default MySQLSequelizeCourseEntity;
