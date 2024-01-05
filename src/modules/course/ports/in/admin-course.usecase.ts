import { QueryCourseDto } from '../../application/dto/query-course.dto';
import { Course } from '../../domain/course.domain';

export abstract class AdminCourseUseCase {
  abstract getAdminCourses(
    queryCourseDto: QueryCourseDto,
  ): Promise<[Course[], number]>;
  abstract addAdminCourseBook({
    courseCode,
    bookCode,
  }: {
    courseCode: string;
    bookCode: string;
  }): Promise<void>;
  abstract getAdminCourseByCodeWithBooks(code: string): Promise<Course>;
  abstract getAdminCourseByIdWithBooks(id: number): Promise<Course>;
  abstract createAdminCourse(course: Course): Promise<Course>;
  abstract updateAdminCourseById(
    id: number,
    course: Partial<Course>,
  ): Promise<void>;
  abstract updateAdminCourseByCode(
    code: string,
    course: Partial<Course>,
  ): Promise<void>;
}
