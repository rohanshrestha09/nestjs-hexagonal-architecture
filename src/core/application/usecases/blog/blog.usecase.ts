import { Injectable } from '@nestjs/common';
import { Course } from 'src/core/domain/course/course.domain';
import { BlogUseCase } from 'src/core/ports/in/blog/blog-usecase.port';
import { BlogRepository } from 'src/core/ports/out/blog/blog-repository.port';

@Injectable()
export class BlogUseCaseImpl implements BlogUseCase {
  constructor(private readonly blogRepository: BlogRepository) {}

  async countAllCourseBlogs(course: Course) {
    return await this.blogRepository.countAllCourseBlogs(course);
  }
}
