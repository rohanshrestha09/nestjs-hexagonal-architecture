import { z } from 'zod';
import { plainToInstance } from 'class-transformer';
import { Book } from '../book/book.domain';
import { User } from '../user/user.domain';
import { Blog } from '../blog/blog.domain';
import { CreateCourseProps, UpdateCourseProps } from './course.types';
import { COURSE_STATUS } from 'src/common/enums/course.enum';

export class Course {
  id: number;
  code: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  status: COURSE_STATUS;
  books: Book[];
  users: User[];
  blogs: Blog[];

  public static create(createCourseProps: CreateCourseProps) {
    const createCourseValidator = z.object({
      code: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number().positive(),
      offerPrice: z.number().positive(),
      status: z.nativeEnum(COURSE_STATUS),
    });

    return plainToInstance(
      Course,
      createCourseValidator.parse(createCourseProps),
      { exposeUnsetFields: false },
    );
  }

  public static update(updateCourseProps: UpdateCourseProps) {
    const updateCourseValidator = z.object({
      description: z.string().optional(),
      offerPrice: z.number().positive().optional(),
      status: z.nativeEnum(COURSE_STATUS).optional(),
    });

    return plainToInstance(
      Course,
      updateCourseValidator.parse(updateCourseProps),
      { exposeUnsetFields: false },
    );
  }

  public static toDomain(course: Course) {
    return plainToInstance(Course, course, { exposeUnsetFields: false });
  }

  public static toDomains(courses: Course[]) {
    return courses?.map((course) => this.toDomain(course));
  }
}
