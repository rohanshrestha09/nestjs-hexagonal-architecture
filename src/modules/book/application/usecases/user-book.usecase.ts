import { Injectable } from '@nestjs/common';
import { BookRepository } from '../../ports/out/book-repository.port';
import { BookMapper } from '../../infrastructure/mapper/book.mapper';
import { UserBookUseCase } from '../../ports/in/user-book-usecase.port';
import { User } from 'src/modules/user/domain/user.domain';
import { Course } from 'src/modules/course/domain/course.domain';

@Injectable()
export class UserBookUseCaseImpl implements UserBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async getUserBooksByCourse(user: User, course: Course) {
    const books = await this.bookRepository.findUserBooksByCourse(user, course);
    return books?.map(BookMapper.forUser);
  }
}
