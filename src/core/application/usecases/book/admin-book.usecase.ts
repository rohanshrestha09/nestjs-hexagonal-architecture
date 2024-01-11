import { Injectable } from '@nestjs/common';
import { AdminBookUseCase } from 'src/core/ports/in/book/admin-book-usecase.port';
import { QueryBookDto } from 'src/core/ports/in/book/book-usecase.types';
import { BookRepository } from 'src/core/ports/out/book/book-repository.port';
import { BookMapper } from '../../mapper/book/book.mapper';
import { Book } from 'src/core/domain/book/book.domain';

@Injectable()
export class AdminBookUseCaseImpl implements AdminBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAdminBooks(queryBookDto: QueryBookDto) {
    const [books, count] = await this.bookRepository.findAllBooks(queryBookDto);
    return [books?.map(BookMapper.forAdmin), count] as [Book[], number];
  }

  async getAdminBooksByCourseId(id: number) {
    const books = await this.bookRepository.findAllBooksByCourseId(id);
    return books?.map(BookMapper.forAdmin);
  }

  async getAdminBooksByCourseCode(code: string) {
    const books = await this.bookRepository.findAllBooksByCourseCode(code);
    return books?.map(BookMapper.forAdmin);
  }

  async getAdminBookById(id: number) {
    return BookMapper.forAdmin(await this.bookRepository.findBookById(id));
  }

  async getAdminBookByCode(code: string) {
    return BookMapper.forAdmin(await this.bookRepository.findBookByCode(code));
  }

  async createAdminBook(book: Book) {
    return BookMapper.forAdmin(await this.bookRepository.createBook(book));
  }

  async updateAdminBookById(id: number, book: Partial<Book>) {
    await this.bookRepository.updateBookById(id, book);
  }

  async updateAdminBookByCode(code: string, book: Partial<Book>) {
    await this.bookRepository.updateBookByCode(code, book);
  }
}
