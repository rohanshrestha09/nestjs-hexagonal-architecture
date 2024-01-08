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
import { Course } from 'src/modules/course/domain/course.domain';
import { MySQLTypeORMBookEntity } from 'src/modules/book/adapters/secondary/mysql-typeorm/book-mysql-typeorm.entity';
import { COURSE_STATUS } from 'src/modules/course/infrastructure/enums/course.enum';
import { MySQLTypeORMUserEntity } from 'src/modules/user/adapters/secondary/mysql-typeorm/user-mysql-typeorm.entity';
import { MySQLTypeORMBlogEntity } from 'src/modules/blog/adapters/secondary/mysql-typeorm/blog-mysql-typeorm.entity';

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
