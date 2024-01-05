import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { MySQLSequelizeBookEntity } from 'src/modules/book/adapters/secondary/mysql-sequelize/book-mysql-sequelize.entity';
import { MySQLSequelizeCourseEntity } from 'src/modules/course/adapters/secondary/mysql-sequelize/course-mysql-sequelize.entity';

@Table({ tableName: 'course_book', modelName: 'course_book' })
export class MySQLSequelizeCourseBookEntity extends Model {
  @ForeignKey(() => MySQLSequelizeCourseEntity)
  @Column
  courseId: number;

  @ForeignKey(() => MySQLSequelizeBookEntity)
  @Column
  bookId: number;
}

export default MySQLSequelizeCourseBookEntity;
