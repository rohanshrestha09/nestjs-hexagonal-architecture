import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import MySQLSequelizeUserEntity from '../user/user-mysql-sequelize.entity';
import MySQLSequelizeCourseEntity from '../course/course-mysql-sequelize.entity';

@Table({ tableName: 'user_course', modelName: 'user_course' })
class MySQLSequelizeUserCourseEntity extends Model {
  @ForeignKey(() => MySQLSequelizeUserEntity)
  @Column
  userId: string;

  @ForeignKey(() => MySQLSequelizeCourseEntity)
  @Column
  courseId: number;
}

export default MySQLSequelizeUserCourseEntity;
