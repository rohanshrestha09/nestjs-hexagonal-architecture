import { Injectable } from '@nestjs/common';
import { AdminBlogUseCase } from '../../ports/in/admin-blog-usecase.port';
import { BlogRepository } from '../../ports/out/blog-repository.port';
import { QueryBlogDto } from '../dto/query-blog.dto';

@Injectable()
export class AdminBlogUseCaseImpl implements AdminBlogUseCase {
  constructor(private readonly blogRepository: BlogRepository) {}

  async getAdminBlogs(queryBlogDto: QueryBlogDto) {
    return await this.blogRepository.findAllBlogs(queryBlogDto);
  }

  async getAdminBlogById(id: number) {
    return await this.blogRepository.findBlogById(id);
  }

  async getAdminBlogBySlug(slug: string) {
    return await this.blogRepository.findBlogBySlug(slug);
  }
}
