import { Book } from 'src/core/domain/book/book.domain';
import { Course } from 'src/core/domain/course/course.domain';
import { User } from 'src/core/domain/user/user.domain';

export abstract class UserBookUseCase {
  abstract getUserBooksByCourse(user: User, course: Course): Promise<Book[]>;
}
