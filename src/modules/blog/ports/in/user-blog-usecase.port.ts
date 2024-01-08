import { Blog } from '../../domain/blog.domain';
import { User } from 'src/modules/user/domain/user.domain';
import { QueryBlogDto } from '../../application/dto/query-blog.dto';

export abstract class UserBlogUseCase {
  abstract getUserBlogs(
    user: User,
    queryBlogDto: QueryBlogDto,
  ): Promise<[Blog[], number]>;
  abstract getUserBlogBySlug(slug: string, user: User): Promise<Blog>;
  abstract getUserBlogById(id: number, user: User): Promise<Blog>;
  abstract createUserBlog(blog: Blog): Promise<Blog>;
  abstract updateUserBlogBySlug(
    { user, slug }: { user: User; slug: string },
    blog: Partial<Blog>,
  ): Promise<void>;
}
