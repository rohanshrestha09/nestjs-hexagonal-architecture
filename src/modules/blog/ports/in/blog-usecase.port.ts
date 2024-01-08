import { Course } from 'src/modules/course/domain/course.domain';

export abstract class BlogUseCase {
  abstract countAllCourseBlogs(course: Course): Promise<number>;
}
