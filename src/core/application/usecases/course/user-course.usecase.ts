import { Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/user/user.domain';
import { BlogUseCase } from 'src/core/ports/in/blog/blog-usecase.port';
import { BookUseCase } from 'src/core/ports/in/book/book-usecase.port';
import { UserBookUseCase } from 'src/core/ports/in/book/user-book-usecase.port';
import { UserCourseUseCase } from 'src/core/ports/in/course/user-course-usecase.port';
import { CourseRepository } from 'src/core/ports/out/course/course-repository.port';
import { CourseMapper } from '../../mapper/course/course.mapper';
import { Course } from 'src/core/domain/course/course.domain';
import { QueryCourseDto } from 'src/core/ports/in/course/course-usecase.types';

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

  async getEnrolledCoursesCount(user: User) {
    return await this.courseRepository.countUserCourses(user);
  }
}
