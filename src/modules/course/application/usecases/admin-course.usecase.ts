import { Injectable } from '@nestjs/common';
import { AdminCourseUseCase } from '../../ports/in/admin-course.usecase';
import { CourseRepository } from '../../ports/out/course-repository.port';
import { QueryCourseDto } from '../dto/query-course.dto';
import { Course } from '../../domain/course.domain';
import { CourseMapper } from '../../infrastructure/mapper/course.mapper';
import { AdminBookUseCase } from 'src/modules/book/ports/in/admin-book-usecase.port';
import { Book } from 'src/modules/book/domain/book.domain';
import { Blog } from 'src/modules/blog/domain/blog.domain';
import { BookUseCase } from 'src/modules/book/ports/in/book-usecase.port';
import { BlogUseCase } from 'src/modules/blog/ports/in/blog-usecase.port';

@Injectable()
export class AdminCourseUseCaseImpl implements AdminCourseUseCase {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly adminBookUseCase: AdminBookUseCase,
    private readonly bookUseCase: BookUseCase,
    private readonly blogUseCase: BlogUseCase,
  ) {}

  async getAdminCourses(queryCourseDto: QueryCourseDto) {
    const [courses, count] =
      await this.courseRepository.findAllCourses(queryCourseDto);

    return [courses?.map(CourseMapper.forAdmin), count] satisfies [
      Course[],
      number,
    ];
  }

  async addAdminCourseBook(code: string, book: Book): Promise<void> {
    await this.courseRepository.addBook(code, book);
  }

  async addAdminCourseBlog(code: string, blog: Blog) {
    await this.courseRepository.addBlog(code, blog);
  }

  async getAdminCourseByIdWithBooks(id: number) {
    const course = new Course();

    course.id = id;

    return {
      data: CourseMapper.forAdmin({
        ...(await this.courseRepository.findCourseById(id)),
        books: await this.adminBookUseCase.getAdminBooksByCourseId(id),
      }),
      blogCount: await this.blogUseCase.countAllCourseBlogs(course),
      bookCount: await this.bookUseCase.countAllCourseBooks(course),
    };
  }

  async getAdminCourseByCodeWithBooks(code: string) {
    const course = new Course();

    course.code = code;

    return {
      data: CourseMapper.forAdmin({
        ...(await this.courseRepository.findCourseByCode(code)),
        books: await this.adminBookUseCase.getAdminBooksByCourseCode(code),
      }),
      blogCount: await this.blogUseCase.countAllCourseBlogs(course),
      bookCount: await this.bookUseCase.countAllCourseBooks(course),
    };
  }

  async createAdminCourse(course: Course) {
    return CourseMapper.forAdmin(
      await this.courseRepository.createCourse(course),
    );
  }

  async updateAdminCourseById(id: number, course: Partial<Course>) {
    await this.courseRepository.updateCourseById(id, course);
  }

  async updateAdminCourseByCode(code: string, course: Partial<Course>) {
    await this.courseRepository.updateCourseByCode(code, course);
  }
}
