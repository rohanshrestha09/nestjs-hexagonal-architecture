import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MySQLTypeORMCourseEntity } from './course-mysql-typeorm.entity';
import { CourseRepository } from 'src/modules/course/ports/out/course-repository.port';
import { Course } from 'src/modules/course/domain/course.domain';
import { Blog } from 'src/modules/blog/domain/blog.domain';
import { User } from 'src/modules/user/domain/user.domain';
import { Book } from 'src/modules/book/domain/book.domain';
import { QueryCourseDto } from 'src/modules/course/application/dto/query-course.dto';
import { COURSE_STATUS } from 'src/modules/course/infrastructure/enums/course.enum';

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
