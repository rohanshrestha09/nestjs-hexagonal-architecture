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
import { AdminBookUseCase } from 'src/modules/book/ports/in/admin-book-usecase.port';
import { Book } from 'src/modules/book/domain/book.domain';
import { QueryBookDto } from 'src/modules/book/application/dto/query-book.dto';
import { CreateBookDto } from 'src/modules/book/application/dto/create-book.dto';
import { UpdateBookDto } from 'src/modules/book/application/dto/update-book.dto';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

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
