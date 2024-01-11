import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import MySQLSequelizeCourseEntity from '../course/course-mysql-sequelize.entity';
import MySQLSequelizeBookEntity from '../book/book-mysql-sequelize.entity';

@Table({ tableName: 'course_book', modelName: 'course_book' })
class MySQLSequelizeCourseBookEntity extends Model {
  @ForeignKey(() => MySQLSequelizeCourseEntity)
  @Column
  courseId: number;

  @ForeignKey(() => MySQLSequelizeBookEntity)
  @Column
  bookId: number;
}

export default MySQLSequelizeCourseBookEntity;
