import { z } from 'zod';
import { kebabCase } from 'lodash';
import { plainToInstance } from 'class-transformer';
import { User } from '../user/user.domain';
import { Course } from '../course/course.domain';
import { CreateBlogProps, UpdateBlogProps } from './blog.types';

export class Blog {
  id: number;
  slug: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  courses: Course[];

  public static create(createBlogProps: CreateBlogProps) {
    const createBlogValidator = z.object({
      title: z.string(),
      content: z.string(),
      userId: z.string(),
    });

    return plainToInstance(
      Blog,
      {
        slug: kebabCase(createBlogProps.title),
        ...createBlogValidator.parse(createBlogProps),
      },
      {
        exposeUnsetFields: false,
      },
    );
  }

  public static update(updateBlogProps: UpdateBlogProps) {
    const updateBlogValidator = z.object({
      title: z.string().optional(),
      content: z.string().optional(),
    });

    return plainToInstance(
      Blog,
      {
        slug: kebabCase(updateBlogProps?.title),
        ...updateBlogValidator.parse(updateBlogProps),
      },
      {
        exposeUnsetFields: false,
      },
    );
  }

  public static toDomain(blog: Blog) {
    return plainToInstance(Blog, blog, { exposeUnsetFields: false });
  }

  public static toDomains(blogs: Blog[]) {
    return blogs?.map((blog) => this.toDomain(blog));
  }
}
