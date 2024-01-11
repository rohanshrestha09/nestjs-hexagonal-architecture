import { Blog } from 'src/core/domain/blog/blog.domain';
import { QueryBlogDto } from './blog-usecase.types';

export abstract class AdminBlogUseCase {
  abstract getAdminBlogs(queryBlogDto: QueryBlogDto): Promise<[Blog[], number]>;
  abstract getAdminBlogBySlug(slug: string): Promise<Blog>;
  abstract getAdminBlogById(id: number): Promise<Blog>;
}
