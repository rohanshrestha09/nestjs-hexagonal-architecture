import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MySQLTypeORMCourseEntity } from './course-mysql-typeorm.entity';
import { CourseRepository } from 'src/modules/course/ports/out/course-repository.port';
import { Course } from 'src/modules/course/domain/course.domain';
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

  async addBook({
    bookCode,
    courseCode,
  }: {
    bookCode: string;
    courseCode: string;
  }) {
    await this.courseRepository.update(
      { code: courseCode },
      { books: [{ code: bookCode }] },
    );
  }

  async addUser({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }) {
    await this.courseRepository.update(
      { code: courseCode, status: COURSE_STATUS.PUBLISHED },
      { users: [{ id: userId }] },
    );
  }

  async findCourseByIdAndUserId({
    courseId,
    userId,
  }: {
    courseId: number;
    userId: string;
  }) {
    return Course.toDomain(
      await this.courseRepository.findOneOrFail({
        where: { id: courseId, users: { id: userId } },
      }),
    );
  }

  async findCourseByCodeAndUserId({
    code,
    userId,
  }: {
    code: string;
    userId: string;
  }) {
    return Course.toDomain(
      await this.courseRepository.findOneOrFail({
        where: { code, users: { id: userId } },
      }),
    );
  }

  async findAllCoursesByUserId(
    userId: string,
    { page, size, sort, order }: QueryCourseDto,
  ) {
    const courses = await this.courseRepository.find({
      where: { users: { id: userId } },
      skip: (page - 1) * size,
      take: size,
      order: {
        [sort]: order,
      },
    });

    const count = await this.courseRepository.count();

    return [Course.toDomains(courses), count] as [Course[], number];
  }
}
