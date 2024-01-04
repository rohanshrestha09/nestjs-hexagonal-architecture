import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogRepository } from 'src/modules/blog/ports/out/blog-repository.port';
import { MySQLTypeORMBlogEntity } from './blog-mysql-typeorm.entity';
import { Blog } from 'src/modules/blog/domain/blog.domain';
import { QueryBlogDto } from 'src/modules/blog/application/dto/query-blog.dto';

@Injectable()
export class MySQLTypeORMBlogRepositoryImpl implements BlogRepository {
  constructor(
    @InjectRepository(MySQLTypeORMBlogEntity)
    private blogRepository: Repository<MySQLTypeORMBlogEntity>,
  ) {}

  async findAllBlogs({ page, size, sort, order }: QueryBlogDto) {
    const blogs = await this.blogRepository.find({
      skip: (page - 1) * size,
      take: size,
      order: {
        [sort]: order,
      },
    });

    const count = await this.blogRepository.count();

    return [Blog.toDomains(blogs), count] as [Blog[], number];
  }

  async findAllBlogsByUserId(
    userId: string,
    { page, size, sort, order }: QueryBlogDto,
  ) {
    const blogs = await this.blogRepository.find({
      where: { userId },
      skip: (page - 1) * size,
      take: size,
      order: {
        [sort]: order,
      },
    });

    const count = await this.blogRepository.count();

    return [Blog.toDomains(blogs), count] as [Blog[], number];
  }

  async findBlogById(blogId: number) {
    return Blog.toDomain(
      await this.blogRepository.findOneOrFail({
        where: {
          id: blogId,
        },
        relations: {
          user: true,
        },
      }),
    );
  }

  async findBlogByIdAndUserId({
    userId,
    blogId,
  }: {
    userId: string;
    blogId: number;
  }) {
    return Blog.toDomain(
      await this.blogRepository.findOneOrFail({
        where: {
          id: blogId,
          userId,
        },
        relations: {
          user: true,
        },
      }),
    );
  }

  async findBlogBySlug(slug: string) {
    return Blog.toDomain(
      await this.blogRepository.findOneOrFail({
        where: {
          slug,
        },
        relations: {
          user: true,
        },
      }),
    );
  }

  async findBlogBySlugAndUserId({
    userId,
    slug,
  }: {
    userId: string;
    slug: string;
  }) {
    return Blog.toDomain(
      await this.blogRepository.findOneOrFail({
        where: {
          slug,
          userId,
        },
        relations: {
          user: true,
        },
      }),
    );
  }

  async createBlog(blog: Blog) {
    return Blog.toDomain(
      await this.blogRepository.save(this.blogRepository.create(blog)),
    );
  }

  async updateBlogBySlug(slug: string, blog: Partial<Blog>) {
    await this.blogRepository.update({ slug }, blog);
  }

  async updateBlogBySlugAndUserId(
    { userId, slug }: { userId: string; slug: string },
    blog: Partial<Blog>,
  ) {
    await this.blogRepository.update({ userId, slug }, blog);
  }
}
