import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { MySQLSequelizeBlogEntity } from 'src/modules/blog/adapters/secondary/mysql-sequelize/blog-mysql-sequelize.entity';
import { MySQLSequelizeCourseEntity } from 'src/modules/course/adapters/secondary/mysql-sequelize/course-mysql-sequelize.entity';

@Table({ tableName: 'course_blog', modelName: 'course_blog' })
export class MySQLSequelizeCourseBlogEntity extends Model {
  @ForeignKey(() => MySQLSequelizeCourseEntity)
  @Column
  courseId: number;

  @ForeignKey(() => MySQLSequelizeBlogEntity)
  @Column
  blogId: number;
}

export default MySQLSequelizeCourseBlogEntity;
