import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../ports/out/course-repository.port';
import { UserCourseUseCase } from '../../ports/in/user-course.usecase';
import { QueryCourseDto } from '../dto/query-course.dto';
import { CourseMapper } from '../../infrastructure/mapper/course.mapper';
import { Course } from '../../domain/course.domain';

@Injectable()
export class UserCourseUseCaseImpl implements UserCourseUseCase {
  constructor(private readonly courseRepository: CourseRepository) {}

  async getEnrolledCourses(userId: string, queryCourseDto: QueryCourseDto) {
    const [courses, count] = await this.courseRepository.findAllCoursesByUserId(
      userId,
      queryCourseDto,
    );

    return [courses?.map(CourseMapper.forUser), count] satisfies [
      Course[],
      number,
    ];
  }

  async getEnrolledCourseById({
    userId,
    courseId,
  }: {
    userId: string;
    courseId: number;
  }) {
    return CourseMapper.forUser(
      await this.courseRepository.findCourseByIdAndUserId({
        userId,
        courseId,
      }),
    );
  }

  async getEnrolledCourseByCode({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }) {
    return CourseMapper.forUser(
      await this.courseRepository.findCourseByCodeAndUserId({
        userId,
        code: courseCode,
      }),
    );
  }

  async enrollCourseByCode({
    userId,
    courseCode,
  }: {
    userId: string;
    courseCode: string;
  }) {
    await this.courseRepository.addUser({
      userId,
      courseCode,
    });
  }
}
