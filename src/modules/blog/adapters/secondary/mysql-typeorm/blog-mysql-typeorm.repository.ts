import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogRepository } from 'src/modules/blog/ports/out/blog-repository.port';
import { MySQLTypeORMBlogEntity } from './blog-mysql-typeorm.entity';
import { Blog } from 'src/modules/blog/domain/blog.domain';
import { QueryBlogDto } from 'src/modules/blog/application/dto/query-blog.dto';
import { User } from 'src/modules/user/domain/user.domain';
import { Course } from 'src/modules/course/domain/course.domain';

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

  async findAllBlogsByUser(
    user: User,
    { page, size, sort, order }: QueryBlogDto,
  ) {
    const blogs = await this.blogRepository.find({
      where: { user },
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

  async findBlogByIdAndUser(id: number, user: User) {
    return Blog.toDomain(
      await this.blogRepository.findOneOrFail({
        where: {
          id,
          user,
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

  async findBlogBySlugAndUser(slug: string, user: User) {
    return Blog.toDomain(
      await this.blogRepository.findOneOrFail({
        where: {
          slug,
          user,
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

  async updateBlogBySlugAndUser(
    { user, slug }: { user: User; slug: string },
    blog: Partial<Blog>,
  ) {
    await this.blogRepository.update({ user, slug }, blog);
  }

  async countBlogs(condition?: Blog) {
    return await this.blogRepository.count({
      where: condition && { ...condition },
    });
  }

  async countAllCourseBlogs(course: Course) {
    return await this.blogRepository.count({ where: { courses: [course] } });
  }
}
