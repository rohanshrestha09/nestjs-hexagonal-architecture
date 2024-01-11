import { Book } from 'src/core/domain/book/book.domain';
import { User } from 'src/core/domain/user/user.domain';
import { Course } from 'src/core/domain/course/course.domain';

export type QueryBookDto = {
  page: number;
  size: number;
  sort: string;
  order: 'ASC' | 'DESC';
};

export abstract class BookRepository {
  abstract findAllBooks(queryBookDto: QueryBookDto): Promise<[Book[], number]>;
  abstract findBookById(bookId: number): Promise<Book>;
  abstract findBookByCode(code: string): Promise<Book>;
  abstract createBook(book: Book): Promise<Book>;
  abstract updateBookById(bookId: number, book: Partial<Book>): Promise<void>;
  abstract updateBookByCode(code: string, book: Partial<Book>): Promise<void>;
  abstract findAllBooksByCourseCode(code: string): Promise<Book[]>;
  abstract findAllBooksByCourseId(id: number): Promise<Book[]>;
  abstract findUserBooksByCourse(user: User, course: Course): Promise<Book[]>;
  abstract countAllCourseBooks(course: Course): Promise<number>;
  abstract countPublishedCourseBooks(course: Course): Promise<number>;
}
