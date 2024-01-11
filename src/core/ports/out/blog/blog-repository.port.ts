import { Blog } from 'src/core/domain/blog/blog.domain';
import { Course } from 'src/core/domain/course/course.domain';
import { User } from 'src/core/domain/user/user.domain';

export type QueryBlogDto = {
  page: number;
  size: number;
  sort: string;
  order: 'ASC' | 'DESC';
};

export abstract class BlogRepository {
  abstract findAllBlogs(queryBlogDto: QueryBlogDto): Promise<[Blog[], number]>;
  abstract findAllBlogsByUser(
    user: User,
    queryBlogDto: QueryBlogDto,
  ): Promise<[Blog[], number]>;
  abstract findBlogById(blogId: number): Promise<Blog>;
  abstract findBlogBySlug(slug: string): Promise<Blog>;
  abstract findBlogByIdAndUser(id: number, user: User): Promise<Blog>;
  abstract findBlogBySlugAndUser(slug: string, user: User): Promise<Blog>;
  abstract createBlog(blog: Blog): Promise<Blog>;
  abstract updateBlogBySlug(slug: string, blog: Partial<Blog>): Promise<void>;
  abstract updateBlogBySlugAndUser(
    { user, slug }: { user: User; slug: string },
    blog: Partial<Blog>,
  ): Promise<void>;
  abstract countAllCourseBlogs(course: Course): Promise<number>;
}
