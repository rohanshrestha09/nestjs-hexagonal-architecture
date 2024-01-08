import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from 'src/modules/user/domain/user.domain';
import { MySQLTypeORMRoleEntity } from 'src/modules/role/adapters/secondary/mysql-typeorm/role-mysql-typeorm.entity';
import { MySQLTypeORMPrivilegeEntity } from 'src/modules/privilege/adapters/secondary/mysql-typeorm/privilege-mysql-typeorm.entity';
import { MySQLTypeORMBlogEntity } from 'src/modules/blog/adapters/secondary/mysql-typeorm/blog-mysql-typeorm.entity';
import { MySQLTypeORMCourseEntity } from 'src/modules/course/adapters/secondary/mysql-typeorm/course-mysql-typeorm.entity';

@Entity('user')
export class MySQLTypeORMUserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @IsEmail()
  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  roleId: number;

  @ManyToOne(() => MySQLTypeORMRoleEntity, (role) => role.users, {
    nullable: false,
  })
  role: MySQLTypeORMRoleEntity;

  @ManyToMany(() => MySQLTypeORMPrivilegeEntity, (privilege) => privilege.users)
  @JoinTable()
  privileges: MySQLTypeORMPrivilegeEntity[];

  @OneToMany(() => MySQLTypeORMBlogEntity, (blog) => blog.user)
  blogs: MySQLTypeORMBlogEntity[];

  @ManyToMany(() => MySQLTypeORMCourseEntity, (course) => course.users)
  @JoinTable()
  courses: MySQLTypeORMCourseEntity[];
}
