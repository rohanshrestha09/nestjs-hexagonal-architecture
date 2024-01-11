import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Course } from 'src/core/domain/course/course.domain';
import { MySQLTypeORMBlogEntity } from '../blog/blog-mysql-typeorm.entity';
import { MySQLTypeORMUserEntity } from '../user/user-mysql-typeorm.entity';
import { MySQLTypeORMBookEntity } from '../book/book-mysql-typeorm.entity';
import { COURSE_STATUS } from 'src/common/enums/course.enum';

@Entity('course')
export class MySQLTypeORMCourseEntity extends BaseEntity implements Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column()
  price: number;

  @Column()
  offerPrice: number;

  @Column({
    type: 'enum',
    enum: COURSE_STATUS,
    default: COURSE_STATUS.PUBLISHED,
  })
  status: COURSE_STATUS;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => MySQLTypeORMBookEntity, (book) => book.courses)
  @JoinTable()
  books: MySQLTypeORMBookEntity[];

  @ManyToMany(() => MySQLTypeORMUserEntity, (user) => user.courses)
  users: MySQLTypeORMUserEntity[];

  @ManyToMany(() => MySQLTypeORMBlogEntity, (blog) => blog.courses)
  blogs: MySQLTypeORMBlogEntity[];
}
