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
import { Roles } from '../../metadata';
import { AdminCourseUseCase } from 'src/core/ports/in/course/admin-course-usecase.port';
import { QueryCourseDto } from '../../dto/course/query-course.dto';
import { ResponseDto } from '../../dto/response.dto';
import { CreateCourseDto } from '../../dto/course/create-course.dto';
import { Course } from 'src/core/domain/course/course.domain';
import { AddCourseBookDto } from '../../dto/course/add-course-book.dto';
import { Book } from 'src/core/domain/book/book.domain';
import { UpdateCourseDto } from '../../dto/course/update-course.dto';
import { ROLE } from 'src/common/enums/role.enum';

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
    const book = new Book();

    book.code = addCourseBookDto.bookCode;

    await this.adminCourseUseCase.addAdminCourseBook(courseCode, book);

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
