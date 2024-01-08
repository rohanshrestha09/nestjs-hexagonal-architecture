import { Course } from 'src/modules/course/domain/course.domain';

export abstract class BookUseCase {
  abstract countPublishedCourseBooks(course: Course): Promise<number>;
  abstract countAllCourseBooks(course: Course): Promise<number>;
}
