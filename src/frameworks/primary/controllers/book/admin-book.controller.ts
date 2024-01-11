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
import { AdminBookUseCase } from 'src/core/ports/in/book/admin-book-usecase.port';
import { QueryBookDto } from '../../dto/book/query-book.dto';
import { ResponseDto } from '../../dto/response.dto';
import { CreateBookDto } from '../../dto/book/create-book.dto';
import { Book } from 'src/core/domain/book/book.domain';
import { UpdateBookDto } from '../../dto/book/update-book.dto';
import { ROLE } from 'src/common/enums/role.enum';

@ApiBearerAuth()
@ApiTags('admin/book')
@Roles(ROLE.ADMIN)
@Controller('admin/book')
export class AdminBookController {
  constructor(private readonly adminBookUseCase: AdminBookUseCase) {}

  @Get()
  @ApiOperation({ summary: 'find all books' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    queryBookDto: QueryBookDto,
  ) {
    const { page, size } = queryBookDto;

    const [books, count] =
      await this.adminBookUseCase.getAdminBooks(queryBookDto);

    return new ResponseDto('Books Fetched', books, {
      count,
      page,
      size,
    });
  }

  @Get(':code')
  @ApiOperation({ summary: 'find book' })
  async findOne(@Param('code') code: string) {
    return new ResponseDto(
      'Book Fetched',
      await this.adminBookUseCase.getAdminBookByCode(code),
    );
  }

  @Post()
  @ApiOperation({ summary: 'create book' })
  async create(
    @Body(new ValidationPipe({ transform: true })) createBookDto: CreateBookDto,
  ) {
    await this.adminBookUseCase.createAdminBook(
      Book.create({
        ...createBookDto,
        publishedDate: new Date(createBookDto.publishedDate),
      }),
    );

    return new ResponseDto('Book Created');
  }

  @Patch(':code')
  @ApiOperation({ summary: 'update book' })
  async update(
    @Param('code') code: string,
    @Body(new ValidationPipe()) updateBookDto: UpdateBookDto,
  ) {
    await this.adminBookUseCase.updateAdminBookByCode(
      code,
      Book.update(updateBookDto),
    );
  }
}
