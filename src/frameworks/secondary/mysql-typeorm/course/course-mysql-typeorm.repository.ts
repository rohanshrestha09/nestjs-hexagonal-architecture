import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MySQLTypeORMCourseEntity } from './course-mysql-typeorm.entity';
import {
  CourseRepository,
  QueryCourseDto,
} from 'src/core/ports/out/course/course-repository.port';
import { Course } from 'src/core/domain/course/course.domain';
import { Book } from 'src/core/domain/book/book.domain';
import { User } from 'src/core/domain/user/user.domain';
import { Blog } from 'src/core/domain/blog/blog.domain';
import { COURSE_STATUS } from 'src/common/enums/course.enum';

@Injectable()
export class MySQLTypeORMCourseRepositoryImpl implements CourseRepository {
  constructor(
    @InjectRepository(MySQLTypeORMCourseEntity)
    private courseRepository: Repository<MySQLTypeORMCourseEntity>,
  ) {}

  async findAllCourses({ page, size, sort, order }: QueryCourseDto) {
    const courses = await this.courseRepository.find({
      skip: (page - 1) * size,
      take: size,
      order: {
        [sort]: order,
      },
    });

    const count = await this.courseRepository.count();

    return [Course.toDomains(courses), count] as [Course[], number];
  }

  async findCourseById(courseId: number) {
    return Course.toDomain(
      await this.courseRepository.findOneOrFail({
        where: {
          id: courseId,
        },
      }),
    );
  }

  async findCourseByCode(code: string) {
    return Course.toDomain(
      await this.courseRepository.findOneOrFail({
        where: {
          code,
        },
      }),
    );
  }

  async createCourse(course: Course) {
    return Course.toDomain(
      await this.courseRepository.save(this.courseRepository.create(course)),
    );
  }

  async updateCourseById(id: number, course: Partial<Course>) {
    await this.courseRepository.update({ id }, course);
  }

  async updateCourseByCode(code: string, course: Partial<Course>) {
    await this.courseRepository.update({ code }, course);
  }

  async addBook(code: string, book: Book) {
    await this.courseRepository.update({ code }, { books: [book] });
  }

  async addUser(code: string, user: User) {
    await this.courseRepository.update(
      { code, status: COURSE_STATUS.PUBLISHED },
      { users: [user] },
    );
  }

  async addBlog(code: string, blog: Blog) {
    await this.courseRepository.update({ code }, { blogs: [blog] });
  }

  async findCourseByIdAndUser(id: number, user: User) {
    return Course.toDomain(
      await this.courseRepository.findOneOrFail({
        where: { id, users: [user] },
      }),
    );
  }

  async findCourseByCodeAndUser(code: string, user: User) {
    return Course.toDomain(
      await this.courseRepository.findOneOrFail({
        where: { code, users: [user] },
      }),
    );
  }

  async findAllCoursesByUser(
    user: User,
    { page, size, sort, order }: QueryCourseDto,
  ) {
    const courses = await this.courseRepository.find({
      where: { users: [user] },
      skip: (page - 1) * size,
      take: size,
      order: {
        [sort]: order,
      },
    });

    const count = await this.courseRepository.count();

    return [Course.toDomains(courses), count] as [Course[], number];
  }

  async countUserCourses(user: User) {
    return await this.courseRepository.count({ where: { users: [user] } });
  }
}
