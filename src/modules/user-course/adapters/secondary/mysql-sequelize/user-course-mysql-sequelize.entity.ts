import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { MySQLSequelizeCourseEntity } from 'src/modules/course/adapters/secondary/mysql-sequelize/course-mysql-sequelize.entity';
import { MySQLSequelizeUserEntity } from 'src/modules/user/adapters/secondary/mysql-sequelize/user-mysql-sequelize.entity';

@Table({ tableName: 'user_course', modelName: 'user_course' })
export class MySQLSequelizeUserCourseEntity extends Model {
  @ForeignKey(() => MySQLSequelizeUserEntity)
  @Column
  userId: string;

  @ForeignKey(() => MySQLSequelizeCourseEntity)
  @Column
  courseId: number;
}

export default MySQLSequelizeUserCourseEntity;
