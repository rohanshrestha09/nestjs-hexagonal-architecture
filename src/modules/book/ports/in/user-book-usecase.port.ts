import { Course } from 'src/modules/course/domain/course.domain';
import { Book } from '../../domain/book.domain';
import { User } from 'src/modules/user/domain/user.domain';

export abstract class UserBookUseCase {
  abstract getUserBooksByCourse(user: User, course: Course): Promise<Book[]>;
}
