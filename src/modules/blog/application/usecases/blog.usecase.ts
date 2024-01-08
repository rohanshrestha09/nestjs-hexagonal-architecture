import { Injectable } from '@nestjs/common';
import { BlogUseCase } from '../../ports/in/blog-usecase.port';
import { BlogRepository } from '../../ports/out/blog-repository.port';
import { Course } from 'src/modules/course/domain/course.domain';

@Injectable()
export class BlogUseCaseImpl implements BlogUseCase {
  constructor(private readonly blogRepository: BlogRepository) {}

  async countAllCourseBlogs(course: Course) {
    return await this.blogRepository.countAllCourseBlogs(course);
  }
}
