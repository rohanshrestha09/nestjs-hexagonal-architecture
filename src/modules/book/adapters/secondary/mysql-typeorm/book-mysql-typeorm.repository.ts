import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MySQLTypeORMBookEntity } from './book-mysql-typeorm.entity';
import { BookRepository } from 'src/modules/book/ports/out/book-repository.port';
import { QueryBookDto } from 'src/modules/book/application/dto/query-book.dto';
import { Book } from 'src/modules/book/domain/book.domain';

@Injectable()
export class MySQLTypeORMBookRepositoryImpl implements BookRepository {
  constructor(
    @InjectRepository(MySQLTypeORMBookEntity)
    private bookRepository: Repository<MySQLTypeORMBookEntity>,
  ) {}

  async findAllBooks({ page, size, sort, order }: QueryBookDto) {
    const books = await this.bookRepository.find({
      skip: (page - 1) * size,
      take: size,
      order: {
        [sort]: order,
      },
    });

    const count = await this.bookRepository.count();

    return [Book.toDomains(books), count] as [Book[], number];
  }

  async findBookById(bookId: number) {
    return Book.toDomain(
      await this.bookRepository.findOneOrFail({
        where: {
          id: bookId,
        },
      }),
    );
  }

  async findBookByCode(code: string) {
    return Book.toDomain(
      await this.bookRepository.findOneOrFail({
        where: {
          code,
        },
      }),
    );
  }

  async createBook(book: Book) {
    return Book.toDomain(
      await this.bookRepository.save(this.bookRepository.create(book)),
    );
  }

  async updateBookById(id: number, book: Partial<Book>) {
    await this.bookRepository.update({ id }, book);
  }

  async updateBookByCode(code: string, book: Partial<Book>) {
    await this.bookRepository.update({ code }, book);
  }
}
