import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { QueryCourseDto } from 'src/modules/course/application/dto/query-course.dto';
import { UserCourseUseCase } from 'src/modules/course/ports/in/user-course.usecase';
import { User as UserDomain } from 'src/modules/user/domain/user.domain';
import { User } from 'src/modules/user/infrastructure/decorators/user.decorator';

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
      user.id,
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
      await this.userCourseUseCase.getEnrolledCourseByCodeWithBooks({
        userId: user.id,
        courseCode: code,
      }),
    );
  }

  @Post(':code')
  @ApiOperation({ summary: 'enroll course' })
  async enroll(@Param('code') code: string, @User() user: UserDomain) {
    await this.userCourseUseCase.enrollCourseByCode({
      userId: user.id,
      courseCode: code,
    });

    return new ResponseDto('Course Enrolled');
  }
}
