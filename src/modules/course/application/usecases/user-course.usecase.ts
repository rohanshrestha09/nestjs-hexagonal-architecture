import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../ports/out/course-repository.port';
import { UserCourseUseCase } from '../../ports/in/user-course.usecase';
import { QueryCourseDto } from '../dto/query-course.dto';
import { CourseMapper } from '../../infrastructure/mapper/course.mapper';
import { Course } from '../../domain/course.domain';
import { UserBookUseCase } from 'src/modules/book/ports/in/user-book-usecase.port';
import { User } from 'src/modules/user/domain/user.domain';
import { BlogUseCase } from 'src/modules/blog/ports/in/blog-usecase.port';
import { BookUseCase } from 'src/modules/book/ports/in/book-usecase.port';

@Injectable()
export class UserCourseUseCaseImpl implements UserCourseUseCase {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userBookUseCase: UserBookUseCase,
    private readonly blogUseCase: BlogUseCase,
    private readonly bookUseCase: BookUseCase,
  ) {}

  async getEnrolledCourses(user: User, queryCourseDto: QueryCourseDto) {
    const [courses, count] = await this.courseRepository.findAllCoursesByUser(
      user,
      queryCourseDto,
    );

    return [courses?.map(CourseMapper.forUser), count] satisfies [
      Course[],
      number,
    ];
  }

  async getEnrolledCourseByIdWithBooks(id: number, user: User) {
    const course = new Course();

    course.id = id;

    return {
      data: CourseMapper.forUser({
        ...(await this.courseRepository.findCourseByIdAndUser(id, user)),
        books: await this.userBookUseCase.getUserBooksByCourse(user, course),
      }),
      blogCount: await this.blogUseCase.countAllCourseBlogs(course),
      bookCount: await this.bookUseCase.countPublishedCourseBooks(course),
    };
  }

  async getEnrolledCourseByCodeWithBooks(code: string, user: User) {
    const course = new Course();

    course.code = code;

    return {
      data: CourseMapper.forUser({
        ...(await this.courseRepository.findCourseByCodeAndUser(code, user)),
        books: await this.userBookUseCase.getUserBooksByCourse(user, course),
      }),
      blogCount: await this.blogUseCase.countAllCourseBlogs(course),
      bookCount: await this.bookUseCase.countPublishedCourseBooks(course),
    };
  }

  async enrollCourseByCode(code: string, user: User) {
    await this.courseRepository.addUser(code, user);
  }
}
