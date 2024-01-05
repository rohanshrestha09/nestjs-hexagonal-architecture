import { QueryCourseDto } from '../../application/dto/query-course.dto';
import { Course } from '../../domain/course.domain';

export abstract class UserCourseUseCase {
  abstract getEnrolledCourses(
    userId: string,
    queryCourseDto: QueryCourseDto,
  ): Promise<[Course[], number]>;
  abstract enrollCourseByCode({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }): Promise<void>;
  abstract getEnrolledCourseByCode({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }): Promise<Course>;
  abstract getEnrolledCourseById({
    userId,
    courseId,
  }: {
    userId: string;
    courseId: number;
  }): Promise<Course>;
}
