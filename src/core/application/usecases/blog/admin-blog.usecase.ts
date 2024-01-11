import { Injectable } from '@nestjs/common';
import { AdminBlogUseCase } from 'src/core/ports/in/blog/admin-blog-usecase.port';
import { QueryBlogDto } from 'src/core/ports/in/blog/blog-usecase.types';
import { BlogRepository } from 'src/core/ports/out/blog/blog-repository.port';
import { BlogMapper } from '../../mapper/blog/blog.mapper';
import { Blog } from 'src/core/domain/blog/blog.domain';

@Injectable()
export class AdminBlogUseCaseImpl implements AdminBlogUseCase {
  constructor(private readonly blogRepository: BlogRepository) {}

  async getAdminBlogs(queryBlogDto: QueryBlogDto) {
    const [blogs, count] = await this.blogRepository.findAllBlogs(queryBlogDto);

    return [blogs?.map(BlogMapper.forAdmin), count] satisfies [Blog[], number];
  }

  async getAdminBlogById(id: number) {
    return BlogMapper.forAdmin(await this.blogRepository.findBlogById(id));
  }

  async getAdminBlogBySlug(slug: string) {
    return BlogMapper.forAdmin(await this.blogRepository.findBlogBySlug(slug));
  }
}
