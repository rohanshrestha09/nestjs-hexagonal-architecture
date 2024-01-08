import { Injectable } from '@nestjs/common';
import { UserBlogUseCase } from '../../ports/in/user-blog-usecase.port';
import { BlogRepository } from '../../ports/out/blog-repository.port';
import { Blog } from '../../domain/blog.domain';
import { QueryBlogDto } from '../dto/query-blog.dto';
import { User } from 'src/modules/user/domain/user.domain';

@Injectable()
export class UserBlogUseCaseImpl implements UserBlogUseCase {
  constructor(private readonly blogRepository: BlogRepository) {}

  async getUserBlogs(user: User, queryBlogDto: QueryBlogDto) {
    return await this.blogRepository.findAllBlogsByUser(user, queryBlogDto);
  }

  async getUserBlogById(id: number, user: User) {
    return await this.blogRepository.findBlogByIdAndUser(id, user);
  }

  async getUserBlogBySlug(slug: string, user: User) {
    return await this.blogRepository.findBlogBySlugAndUser(slug, user);
  }

  async createUserBlog(blog: Blog) {
    return await this.blogRepository.createBlog(blog);
  }

  async updateUserBlogBySlug(
    { user, slug }: { user: User; slug: string },
    blog: Partial<Blog>,
  ) {
    await this.blogRepository.updateBlogBySlugAndUser({ user, slug }, blog);
  }
}
