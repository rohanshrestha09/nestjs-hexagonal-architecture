import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Blog } from 'src/core/domain/blog/blog.domain';
import { MySQLTypeORMUserEntity } from '../user/user-mysql-typeorm.entity';
import { MySQLTypeORMCourseEntity } from '../course/course-mysql-typeorm.entity';

@Entity('blog')
export class MySQLTypeORMBlogEntity extends BaseEntity implements Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'longtext' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => MySQLTypeORMUserEntity, (user) => user.blogs, {
    nullable: false,
  })
  user: MySQLTypeORMUserEntity;

  @ManyToMany(() => MySQLTypeORMCourseEntity, (course) => course.blogs)
  courses: MySQLTypeORMCourseEntity[];
}
