import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCourseUseCase } from 'src/core/ports/in/course/user-course-usecase.port';
import { QueryCourseDto } from '../../dto/course/query-course.dto';
import { User } from '../../decorators/user/user.decorator';
import { ResponseDto } from '../../dto/response.dto';
import { User as UserDomain } from 'src/core/domain/user/user.domain';

@ApiBearerAuth()
@ApiTags('user/course')
@Controller('user/course')
export class UserCourseController {
  constructor(private readonly userCourseUseCase: UserCourseUseCase) {}

  @Get()
  @ApiOperation({ summary: 'find all courses' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    queryCourseDto: QueryCourseDto,
    @User() user: UserDomain,
  ) {
    const { page, size } = queryCourseDto;

    const [courses, count] = await this.userCourseUseCase.getEnrolledCourses(
      user,
      queryCourseDto,
    );

    return new ResponseDto('Courses Fetched', courses, {
      count,
      page,
      size,
    });
  }

  @Get(':code')
  @ApiOperation({ summary: 'find course' })
  async findOne(@Param('code') code: string, @User() user: UserDomain) {
    return new ResponseDto(
      'Course Fetched',
      await this.userCourseUseCase.getEnrolledCourseByCodeWithBooks(code, user),
    );
  }

  @Post(':code')
  @ApiOperation({ summary: 'enroll course' })
  async enroll(@Param('code') code: string, @User() user: UserDomain) {
    await this.userCourseUseCase.enrollCourseByCode(code, user);

    return new ResponseDto('Course Enrolled');
  }
}
