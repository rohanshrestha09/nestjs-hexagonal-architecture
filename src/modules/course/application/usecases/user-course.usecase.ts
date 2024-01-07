import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../ports/out/course-repository.port';
import { UserCourseUseCase } from '../../ports/in/user-course.usecase';
import { QueryCourseDto } from '../dto/query-course.dto';
import { CourseMapper } from '../../infrastructure/mapper/course.mapper';
import { Course } from '../../domain/course.domain';
import { UserBookUseCase } from 'src/modules/book/ports/in/user-book-usecase.port';

@Injectable()
export class UserCourseUseCaseImpl implements UserCourseUseCase {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly userBookUseCase: UserBookUseCase,
  ) {}

  async getEnrolledCourses(userId: string, queryCourseDto: QueryCourseDto) {
    const [courses, count] = await this.courseRepository.findAllCoursesByUserId(
      userId,
      queryCourseDto,
    );

    return [courses?.map(CourseMapper.forUser), count] satisfies [
      Course[],
      number,
    ];
  }

  async getEnrolledCourseByIdWithBooks({
    userId,
    courseId,
  }: {
    userId: string;
    courseId: number;
  }) {
    return CourseMapper.forUser({
      ...(await this.courseRepository.findCourseByIdAndUserId({
        userId,
        courseId,
      })),
      books: await this.userBookUseCase.getUserBooksByCourseId({
        userId,
        courseId,
      }),
    });
  }

  async getEnrolledCourseByCodeWithBooks({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }) {
    return CourseMapper.forUser({
      ...(await this.courseRepository.findCourseByCodeAndUserId({
        userId,
        code: courseCode,
      })),
      books: await this.userBookUseCase.getUserBooksByCourseCode({
        userId,
        courseCode,
      }),
    });
  }

  async enrollCourseByCode({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }) {
    await this.courseRepository.addUser({
      userId,
      courseCode,
    });
  }
}
