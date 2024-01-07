import { Book } from '../../domain/book.domain';

export abstract class UserBookUseCase {
  abstract getUserBooksByCourseId({
    userId,
    courseId,
  }: {
    userId: string;
    courseId: number;
  }): Promise<Book[]>;
  abstract getUserBooksByCourseCode({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }): Promise<Book[]>;
}
