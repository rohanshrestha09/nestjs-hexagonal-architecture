import { Injectable } from '@nestjs/common';
import { BookUseCase } from '../../ports/in/book-usecase.port';
import { BookRepository } from '../../ports/out/book-repository.port';
import { Course } from 'src/modules/course/domain/course.domain';

@Injectable()
export class BookUseCaseImpl implements BookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async countPublishedCourseBooks(course: Course) {
    return await this.bookRepository.countPublishedCourseBooks(course);
  }

  async countAllCourseBooks(course: Course) {
    return await this.bookRepository.countAllCourseBooks(course);
  }
}
