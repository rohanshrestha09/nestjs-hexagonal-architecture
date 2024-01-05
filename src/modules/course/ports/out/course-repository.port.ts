import { QueryCourseDto } from '../../application/dto/query-course.dto';
import { Course } from '../../domain/course.domain';

export abstract class CourseRepository {
  abstract findAllCourses(
    queryCourseDto: QueryCourseDto,
  ): Promise<[Course[], number]>;
  abstract findCourseById(id: number): Promise<Course>;
  abstract findCourseByCode(code: string): Promise<Course>;
  abstract createCourse(course: Course): Promise<Course>;
  abstract updateCourseByCode(
    code: string,
    course: Partial<Course>,
  ): Promise<void>;
  abstract updateCourseById(id: number, course: Partial<Course>): Promise<void>;
  abstract addBook({
    bookCode,
    courseCode,
  }: {
    bookCode: string;
    courseCode: string;
  }): Promise<void>;
  abstract addUser({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }): Promise<void>;
  abstract findCourseByIdAndUserId({
    courseId,
    userId,
  }: {
    courseId: number;
    userId: string;
  }): Promise<Course>;
  abstract findCourseByCodeAndUserId({
    code,
    userId,
  }: {
    code: string;
    userId: string;
  }): Promise<Course>;
  abstract findAllCoursesByUserId(
    userId: string,
    queryCourseDto: QueryCourseDto,
  ): Promise<[Course[], number]>;
}
