import { User } from 'src/modules/user/domain/user.domain';
import { Book } from 'src/modules/book/domain/book.domain';
import { Course } from '../../domain/course.domain';
import { Blog } from 'src/modules/blog/domain/blog.domain';
import { QueryCourseDto } from '../../application/dto/query-course.dto';

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
  abstract addBook(courseCode: string, book: Book): Promise<void>;
  abstract addUser(courseCode: string, user: User): Promise<void>;
  abstract addBlog(courseCode: string, blog: Blog): Promise<void>;
  abstract findCourseByIdAndUser(courseId: number, user: User): Promise<Course>;
  abstract findCourseByCodeAndUser(code: string, user: User): Promise<Course>;
  abstract findAllCoursesByUser(
    user: User,
    queryCourseDto: QueryCourseDto,
  ): Promise<[Course[], number]>;
  abstract countUserCourses(user: User): Promise<number>;
}
