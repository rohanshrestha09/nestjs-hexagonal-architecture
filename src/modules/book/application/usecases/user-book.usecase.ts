import { Injectable } from '@nestjs/common';
import { BookRepository } from '../../ports/out/book-repository.port';
import { BookMapper } from '../../infrastructure/mapper/book.mapper';
import { UserBookUseCase } from '../../ports/in/user-book-usecase.port';

@Injectable()
export class UserBookUseCaseImpl implements UserBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async getUserBooksByCourseId({
    userId,
    courseId,
  }: {
    userId: string;
    courseId: number;
  }) {
    const books = await this.bookRepository.findUserBooksByCourseId({
      userId,
      courseId,
    });
    return books?.map(BookMapper.forUser);
  }

  async getUserBooksByCourseCode({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }) {
    const books = await this.bookRepository.findUserBooksByCourseCode({
      userId,
      courseCode,
    });
    return books?.map(BookMapper.forUser);
  }
}
