import { Blog } from '../../domain/blog.domain';
import { QueryBlogDto } from '../../application/dto/query-blog.dto';

export abstract class UserBlogUseCase {
  abstract getUserBlogs(
    userId: string,
    queryBlogDto: QueryBlogDto,
  ): Promise<[Blog[], number]>;
  abstract getUserBlogBySlug({
    userId,
    slug,
  }: {
    userId: string;
    slug: string;
  }): Promise<Blog>;
  abstract getUserBlogById({
    userId,
    blogId,
  }: {
    userId: string;
    blogId: number;
  }): Promise<Blog>;
  abstract createUserBlog(blog: Blog): Promise<Blog>;
  abstract updateUserBlogBySlug(
    { userId, slug }: { userId: string; slug: string },
    blog: Partial<Blog>,
  ): Promise<void>;
}
