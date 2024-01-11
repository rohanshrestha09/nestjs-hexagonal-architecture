import { Course } from 'src/core/domain/course/course.domain';

export abstract class BookUseCase {
  abstract countPublishedCourseBooks(course: Course): Promise<number>;
  abstract countAllCourseBooks(course: Course): Promise<number>;
}
