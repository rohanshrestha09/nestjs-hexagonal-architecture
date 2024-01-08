import { QueryCourseDto } from '../../application/dto/query-course.dto';
import { Course } from '../../domain/course.domain';
import { Blog } from 'src/modules/blog/domain/blog.domain';
import { Book } from 'src/modules/book/domain/book.domain';

export abstract class AdminCourseUseCase {
  abstract getAdminCourses(
    queryCourseDto: QueryCourseDto,
  ): Promise<[Course[], number]>;
  abstract addAdminCourseBook(code: string, book: Book): Promise<void>;
  abstract addAdminCourseBlog(code: string, blog: Blog): Promise<void>;
  abstract getAdminCourseByCodeWithBooks(
    code: string,
  ): Promise<{ data: Course; blogCount: number; bookCount: number }>;
  abstract getAdminCourseByIdWithBooks(
    id: number,
  ): Promise<{ data: Course; blogCount: number; bookCount: number }>;
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
