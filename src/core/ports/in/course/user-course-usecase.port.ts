import { Course } from 'src/core/domain/course/course.domain';
import { User } from 'src/core/domain/user/user.domain';
import { QueryCourseDto } from './course-usecase.types';

export abstract class UserCourseUseCase {
  abstract getEnrolledCourses(
    user: User,
    queryCourseDto: QueryCourseDto,
  ): Promise<[Course[], number]>;
  abstract enrollCourseByCode(courseCode: string, user: User): Promise<void>;
  abstract getEnrolledCourseByCodeWithBooks(
    courseCode: string,
    user: User,
  ): Promise<{ data: Course; blogCount: number; bookCount: number }>;
  abstract getEnrolledCourseByIdWithBooks(
    courseId: number,
    user: User,
  ): Promise<{ data: Course; blogCount: number; bookCount: number }>;
  abstract getEnrolledCoursesCount(user: User): Promise<number>;
}
