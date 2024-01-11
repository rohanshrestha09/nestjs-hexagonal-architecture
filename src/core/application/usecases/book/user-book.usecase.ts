import { Injectable } from '@nestjs/common';
import { Course } from 'src/core/domain/course/course.domain';
import { User } from 'src/core/domain/user/user.domain';
import { UserBookUseCase } from 'src/core/ports/in/book/user-book-usecase.port';
import { BookRepository } from 'src/core/ports/out/book/book-repository.port';
import { BookMapper } from '../../mapper/book/book.mapper';

@Injectable()
export class UserBookUseCaseImpl implements UserBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async getUserBooksByCourse(user: User, course: Course) {
    const books = await this.bookRepository.findUserBooksByCourse(user, course);
    return books?.map(BookMapper.forUser);
  }
}
