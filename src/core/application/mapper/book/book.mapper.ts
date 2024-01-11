import { Book } from 'src/core/domain/book/book.domain';

export class BookMapper {
  static forAdmin(book: Book) {
    return book;
  }

  static forUser(book: Book) {
    delete book.price;

    return book;
  }
}
