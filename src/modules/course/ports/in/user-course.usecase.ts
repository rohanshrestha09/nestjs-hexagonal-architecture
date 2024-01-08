import { QueryCourseDto } from '../../application/dto/query-course.dto';
import { Course } from '../../domain/course.domain';
import { User } from 'src/modules/user/domain/user.domain';

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
