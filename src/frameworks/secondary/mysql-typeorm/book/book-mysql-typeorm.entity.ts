import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { Book } from 'src/core/domain/book/book.domain';
import { MySQLTypeORMCourseEntity } from '../course/course-mysql-typeorm.entity';
import { BOOK_STATUS } from 'src/common/enums/book.enum';

@Entity('book')
export class MySQLTypeORMBookEntity extends BaseEntity implements Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  price: number;

  @Column()
  offerPrice: number;

  @Column()
  publishedDate: Date;

  @Column()
  edition: string;

  @Column({ default: 0 })
  pages: number;

  @Column({ type: 'enum', enum: BOOK_STATUS, default: BOOK_STATUS.PUBLISHED })
  status: BOOK_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => MySQLTypeORMCourseEntity, (course) => course.books)
  courses: MySQLTypeORMCourseEntity[];
}
