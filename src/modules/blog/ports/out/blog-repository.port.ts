import { User } from 'src/modules/user/domain/user.domain';
import { Blog } from '../../domain/blog.domain';
import { Course } from 'src/modules/course/domain/course.domain';
import { QueryBlogDto } from '../../application/dto/query-blog.dto';

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
