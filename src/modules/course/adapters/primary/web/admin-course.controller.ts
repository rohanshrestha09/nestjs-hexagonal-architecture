import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/metadata';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { Course } from 'src/modules/course/domain/course.domain';
import { AdminCourseUseCase } from 'src/modules/course/ports/in/admin-course.usecase';
import { QueryCourseDto } from 'src/modules/course/application/dto/query-course.dto';
import { CreateCourseDto } from 'src/modules/course/application/dto/create-course.dto';
import { UpdateCourseDto } from 'src/modules/course/application/dto/update-course.dto';
import { AddCourseBookDto } from 'src/modules/course/application/dto/add-course-book.dto';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@ApiBearerAuth()
@ApiTags('admin/course')
@Roles(ROLE.ADMIN)
@Controller('admin/course')
export class AdminCourseController {
  constructor(private readonly adminCourseUseCase: AdminCourseUseCase) {}

  @Get()
  @ApiOperation({ summary: 'find all courses' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    queryCourseDto: QueryCourseDto,
  ) {
    const { page, size } = queryCourseDto;

    const [courses, count] =
      await this.adminCourseUseCase.getAdminCourses(queryCourseDto);

    return new ResponseDto('Courses Fetched', courses, {
      count,
      page,
      size,
    });
  }

  @Get(':code')
  @ApiOperation({ summary: 'find course' })
  async findOne(@Param('code') code: string) {
    return new ResponseDto(
      'Course Fetched',
      await this.adminCourseUseCase.getAdminCourseByCodeWithBooks(code),
    );
  }

  @Post()
  @ApiOperation({ summary: 'create course' })
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createCourseDto: CreateCourseDto,
  ) {
    await this.adminCourseUseCase.createAdminCourse(
      Course.create({
        ...createCourseDto,
      }),
    );

    return new ResponseDto('Course Created');
  }

  @Post(':code/book')
  @ApiOperation({ summary: 'add book' })
  async addBook(
    @Param('code') courseCode: string,
    @Body(new ValidationPipe()) addCourseBookDto: AddCourseBookDto,
  ) {
    await this.adminCourseUseCase.addAdminCourseBook({
      bookCode: addCourseBookDto.bookCode,
      courseCode,
    });

    return new ResponseDto('Book Added');
  }

  @Patch(':code')
  @ApiOperation({ summary: 'update course' })
  async update(
    @Param('code') code: string,
    @Body(new ValidationPipe()) updateCourseDto: UpdateCourseDto,
  ) {
    await this.adminCourseUseCase.updateAdminCourseByCode(
      code,
      Course.update(updateCourseDto),
    );
  }
}
