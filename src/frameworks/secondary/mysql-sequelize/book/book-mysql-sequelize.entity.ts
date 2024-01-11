import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Book } from 'src/core/domain/book/book.domain';
import MySQLSequelizeCourseEntity from '../course/course-mysql-sequelize.entity';
import MySQLSequelizeCourseBookEntity from '../course-book/course-book-mysql-sequelize.entity';
import { BOOK_STATUS } from 'src/common/enums/book.enum';

@Table({ tableName: 'book', modelName: 'book' })
class MySQLSequelizeBookEntity extends Model implements Book {
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
  code: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @Column({ type: DataType.STRING, allowNull: false })
  publisher: string;

  @Column({ type: DataType.NUMBER, allowNull: false, validate: { min: 1 } })
  price: number;

  @Column({ type: DataType.NUMBER, allowNull: false, validate: { min: 1 } })
  offerPrice: number;

  @Column({ type: DataType.DATE, allowNull: false })
  publishedDate: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  edition: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    defaultValue: 0,
    validate: { min: 0 },
  })
  pages: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(BOOK_STATUS),
    defaultValue: BOOK_STATUS.PUBLISHED,
  })
  status: BOOK_STATUS;

  @Column({ type: DataType.DATE, allowNull: false })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(
    () => MySQLSequelizeCourseEntity,
    () => MySQLSequelizeCourseBookEntity,
  )
  courses: MySQLSequelizeCourseEntity[];
}

export default MySQLSequelizeBookEntity;
