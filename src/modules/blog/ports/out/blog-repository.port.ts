import { QueryBlogDto } from '../../application/dto/query-blog.dto';
import { Blog } from '../../domain/blog.domain';

export abstract class BlogRepository {
  abstract findAllBlogs(queryBlogDto: QueryBlogDto): Promise<[Blog[], number]>;
  abstract findAllBlogsByUserId(
    userId: string,
    queryBlogDto: QueryBlogDto,
  ): Promise<[Blog[], number]>;
  abstract findBlogById(blogId: number): Promise<Blog>;
  abstract findBlogByIdAndUserId({
    userId,
    blogId,
  }: {
    userId: string;
    blogId: number;
  }): Promise<Blog>;
  abstract findBlogBySlug(slug: string): Promise<Blog>;
  abstract findBlogBySlugAndUserId({
    userId,
    slug,
  }: {
    userId: string;
    slug: string;
  }): Promise<Blog>;
  abstract createBlog(blog: Blog): Promise<Blog>;
  abstract updateBlogBySlug(slug: string, blog: Partial<Blog>): Promise<void>;
  abstract updateBlogBySlugAndUserId(
    { userId, slug }: { userId: string; slug: string },
    blog: Partial<Blog>,
  ): Promise<void>;
}
