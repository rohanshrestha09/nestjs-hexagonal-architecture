import { Blog } from '../../domain/blog.domain';
import { QueryBlogDto } from '../../application/dto/query-blog.dto';

export abstract class AdminBlogUseCase {
  abstract getAdminBlogs(queryBlogDto: QueryBlogDto): Promise<[Blog[], number]>;
  abstract getAdminBlogBySlug(slug: string): Promise<Blog>;
  abstract getAdminBlogById(id: number): Promise<Blog>;
}
