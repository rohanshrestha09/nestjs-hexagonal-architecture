import { Injectable } from '@nestjs/common';
import { UserBlogUseCase } from '../../ports/in/user-blog-usecase.port';
import { BlogRepository } from '../../ports/out/blog-repository.port';
import { Blog } from '../../domain/blog.domain';
import { QueryBlogDto } from '../dto/query-blog.dto';

@Injectable()
export class UserBlogUseCaseImpl implements UserBlogUseCase {
  constructor(private readonly blogRepository: BlogRepository) {}

  async getUserBlogs(userId: string, queryBlogDto: QueryBlogDto) {
    return await this.blogRepository.findAllBlogsByUserId(userId, queryBlogDto);
  }

  async getUserBlogById({
    userId,
    blogId,
  }: {
    userId: string;
    blogId: number;
  }) {
    return await this.blogRepository.findBlogByIdAndUserId({ userId, blogId });
  }

  async getUserBlogBySlug({ userId, slug }: { userId: string; slug: string }) {
    return await this.blogRepository.findBlogBySlugAndUserId({ userId, slug });
  }

  async createUserBlog(blog: Blog) {
    return await this.blogRepository.createBlog(blog);
  }

  async updateUserBlogBySlug(
    { userId, slug }: { userId: string; slug: string },
    blog: Partial<Blog>,
  ) {
    await this.blogRepository.updateBlogBySlugAndUserId({ userId, slug }, blog);
  }
}
