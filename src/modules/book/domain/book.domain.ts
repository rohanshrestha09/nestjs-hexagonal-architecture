import { z } from 'zod';
import { plainToInstance } from 'class-transformer';
import { CreateBookProps, UpdateBookProps } from './book.types';
import { Course } from 'src/modules/course/domain/course.domain';
import { BOOK_STATUS } from '../infrastructure/enums/book.enum';

export class Book {
  id: number;
  code: string;
  title: string;
  author: string;
  publisher: string;
  price: number;
  offerPrice: number;
  description: string;
  publishedDate: Date;
  edition: string;
  pages: number;
  status: BOOK_STATUS;
  createdAt: Date;
  updatedAt: Date;
  courses: Course[];

  public static create(createBookProps: CreateBookProps) {
    const createBookValidator = z.object({
      code: z.string(),
      title: z.string(),
      author: z.string(),
      publisher: z.string(),
      price: z.number().positive(),
      offerPrice: z.number().positive(),
      description: z.string(),
      publishedDate: z.date(),
      edition: z.string(),
      pages: z.number().positive(),
      status: z.nativeEnum(BOOK_STATUS),
    });

    return plainToInstance(Book, createBookValidator.parse(createBookProps), {
      exposeUnsetFields: false,
    });
  }

  public static update(updateBookProps: UpdateBookProps) {
    const updateBookValidator = z.object({
      offerPrice: z.number().optional(),
      description: z.string().optional(),
      status: z.nativeEnum(BOOK_STATUS).optional(),
    });

    return plainToInstance(Book, updateBookValidator.parse(updateBookProps), {
      exposeUnsetFields: false,
    });
  }

  public static toDomain(book: Book) {
    return plainToInstance(Book, book, { exposeUnsetFields: false });
  }

  public static toDomains(books: Book[]) {
    return books?.map((book) => this.toDomain(book));
  }
}
