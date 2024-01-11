import { Course } from 'src/core/domain/course/course.domain';

export class CourseMapper {
  public static forUser(course: Course) {
    delete course.price;

    return course;
  }

  public static forAdmin(course: Course) {
    return course;
  }
}
