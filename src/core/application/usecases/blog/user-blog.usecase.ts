import { Injectable } from '@nestjs/common';
import { Blog } from 'src/core/domain/blog/blog.domain';
import { User } from 'src/core/domain/user/user.domain';
import { QueryBlogDto } from 'src/core/ports/in/blog/blog-usecase.types';
import { UserBlogUseCase } from 'src/core/ports/in/blog/user-blog-usecase.port';
import { BlogRepository } from 'src/core/ports/out/blog/blog-repository.port';
import { BlogMapper } from '../../mapper/blog/blog.mapper';

@Injectable()
export class UserBlogUseCaseImpl implements UserBlogUseCase {
  constructor(private readonly blogRepository: BlogRepository) {}

  async getUserBlogs(user: User, queryBlogDto: QueryBlogDto) {
    const [blogs, count] = await this.blogRepository.findAllBlogsByUser(
      user,
      queryBlogDto,
    );

    return [blogs?.map(BlogMapper.forUser), count] satisfies [Blog[], number];
  }

  async getUserBlogById(id: number, user: User) {
    return BlogMapper.forUser(
      await this.blogRepository.findBlogByIdAndUser(id, user),
    );
  }

  async getUserBlogBySlug(slug: string, user: User) {
    return BlogMapper.forUser(
      await this.blogRepository.findBlogBySlugAndUser(slug, user),
    );
  }

  async createUserBlog(blog: Blog) {
    return BlogMapper.forUser(await this.blogRepository.createBlog(blog));
  }

  async updateUserBlogBySlug(
    { user, slug }: { user: User; slug: string },
    blog: Partial<Blog>,
  ) {
    await this.blogRepository.updateBlogBySlugAndUser({ user, slug }, blog);
  }
}
