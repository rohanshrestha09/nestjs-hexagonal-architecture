import { Injectable } from '@nestjs/common';
import { AdminBookUseCase } from '../../ports/in/admin-book-usecase.port';
import { BookRepository } from '../../ports/out/book-repository.port';
import { QueryBookDto } from '../dto/query-book.dto';
import { Book } from '../../domain/book.domain';

@Injectable()
export class AdminBookUseCaseImpl implements AdminBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAdminBooks(queryBookDto: QueryBookDto) {
    return await this.bookRepository.findAllBooks(queryBookDto);
  }

  async getAdminBookById(id: number) {
    return await this.bookRepository.findBookById(id);
  }

  async getAdminBookByCode(code: string) {
    return await this.bookRepository.findBookByCode(code);
  }

  async createAdminBook(book: Book) {
    return await this.bookRepository.createBook(book);
  }

  async updateAdminBookById(id: number, book: Partial<Book>) {
    await this.bookRepository.updateBookById(id, book);
  }

  async updateAdminBookByCode(code: string, book: Partial<Book>) {
    await this.bookRepository.updateBookByCode(code, book);
  }
}
