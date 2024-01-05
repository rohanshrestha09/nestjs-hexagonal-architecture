import { BOOK_STATUS } from '../infrastructure/enums/book.enum';

export type CreateBookProps = {
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
};

export type UpdateBookProps = {
  offerPrice?: number;
  description?: string;
  status?: BOOK_STATUS;
};
