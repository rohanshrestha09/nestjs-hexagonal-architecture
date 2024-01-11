import { Course } from 'src/core/domain/course/course.domain';

export abstract class BlogUseCase {
  abstract countAllCourseBlogs(course: Course): Promise<number>;
}
