import { Injectable } from '@nestjs/common';
import { AdminCourseUseCase } from '../../ports/in/admin-course.usecase';
import { CourseRepository } from '../../ports/out/course-repository.port';
import { QueryCourseDto } from '../dto/query-course.dto';
import { Course } from '../../domain/course.domain';
import { CourseMapper } from '../../infrastructure/mapper/course.mapper';
import { AdminBookUseCase } from 'src/modules/book/ports/in/admin-book-usecase.port';

@Injectable()
export class AdminCourseUseCaseImpl implements AdminCourseUseCase {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly adminBookUseCase: AdminBookUseCase,
  ) {}

  async getAdminCourses(queryCourseDto: QueryCourseDto) {
    const [courses, count] =
      await this.courseRepository.findAllCourses(queryCourseDto);

    return [courses?.map(CourseMapper.forAdmin), count] satisfies [
      Course[],
      number,
    ];
  }

  async addAdminCourseBook({
    courseCode,
    bookCode,
  }: {
    courseCode: string;
    bookCode: string;
  }): Promise<void> {
    await this.courseRepository.addBook({
      courseCode,
      bookCode,
    });
  }

  async getAdminCourseByIdWithBooks(id: number) {
    return CourseMapper.forAdmin({
      ...(await this.courseRepository.findCourseById(id)),
      books: await this.adminBookUseCase.getAdminBooksByCourseId(id),
    });
  }

  async getAdminCourseByCodeWithBooks(code: string) {
    return CourseMapper.forAdmin({
      ...(await this.courseRepository.findCourseByCode(code)),
      books: await this.adminBookUseCase.getAdminBooksByCourseCode(code),
    });
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
