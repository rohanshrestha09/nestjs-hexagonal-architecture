import { Book } from '../../domain/book.domain';
import { QueryBookDto } from '../../application/dto/query-book.dto';

export abstract class AdminBookUseCase {
  abstract getAdminBooks(queryBookDto: QueryBookDto): Promise<[Book[], number]>;
  abstract getAdminBookByCode(code: string): Promise<Book>;
  abstract getAdminBookById(id: number): Promise<Book>;
  abstract createAdminBook(book: Book): Promise<Book>;
  abstract updateAdminBookById(id: number, book: Partial<Book>): Promise<void>;
  abstract updateAdminBookByCode(
    code: string,
    book: Partial<Book>,
  ): Promise<void>;
  abstract getAdminBooksByCourseId(id: number): Promise<Book[]>;
  abstract getAdminBooksByCourseCode(code: string): Promise<Book[]>;
}
