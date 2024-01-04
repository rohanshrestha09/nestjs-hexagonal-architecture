import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { MySQLTypeORMUserEntity } from 'src/modules/user/adapters/secondary/mysql-typeorm/user-mysql-typeorm.entity';
import { Blog } from 'src/modules/blog/domain/blog.domain';

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
}
