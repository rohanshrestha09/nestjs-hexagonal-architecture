import { Injectable } from '@nestjs/common';
import { Course } from 'src/core/domain/course/course.domain';
import { BookUseCase } from 'src/core/ports/in/book/book-usecase.port';
import { BookRepository } from 'src/core/ports/out/book/book-repository.port';

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
