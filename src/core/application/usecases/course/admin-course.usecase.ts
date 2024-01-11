import { Injectable } from '@nestjs/common';
import { BlogUseCase } from 'src/core/ports/in/blog/blog-usecase.port';
import { AdminBookUseCase } from 'src/core/ports/in/book/admin-book-usecase.port';
import { BookUseCase } from 'src/core/ports/in/book/book-usecase.port';
import { AdminCourseUseCase } from 'src/core/ports/in/course/admin-course-usecase.port';
import { QueryCourseDto } from 'src/core/ports/in/course/course-usecase.types';
import { CourseRepository } from 'src/core/ports/out/course/course-repository.port';
import { CourseMapper } from '../../mapper/course/course.mapper';
import { Course } from 'src/core/domain/course/course.domain';
import { Book } from 'src/core/domain/book/book.domain';
import { Blog } from 'src/core/domain/blog/blog.domain';

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
