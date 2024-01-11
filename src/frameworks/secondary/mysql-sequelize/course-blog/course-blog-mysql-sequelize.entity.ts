import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import MySQLSequelizeCourseEntity from '../course/course-mysql-sequelize.entity';
import MySQLSequelizeBlogEntity from '../blog/blog-mysql-sequelize.entity';

@Table({ tableName: 'course_blog', modelName: 'course_blog' })
class MySQLSequelizeCourseBlogEntity extends Model {
  @ForeignKey(() => MySQLSequelizeCourseEntity)
  @Column
  courseId: number;

  @ForeignKey(() => MySQLSequelizeBlogEntity)
  @Column
  blogId: number;
}

export default MySQLSequelizeCourseBlogEntity;
