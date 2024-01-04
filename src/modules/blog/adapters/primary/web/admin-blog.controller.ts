import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/utils/metadata';
import { AdminBlogUseCase } from 'src/modules/blog/ports/in/admin-blog-usecase.port';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { QueryBlogDto } from 'src/modules/blog/application/dto/query-blog.dto';
import { ROLE } from 'src/modules/role/infrastructure/enums/role.enum';

@ApiBearerAuth()
@ApiTags('admin/blog')
@Roles(ROLE.ADMIN)
@Controller('admin/blog')
export class AdminBlogController {
  constructor(private readonly adminBlogUseCase: AdminBlogUseCase) {}

  @Get()
  @ApiOperation({ summary: 'find all blogs' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    queryBlogDto: QueryBlogDto,
  ) {
    const { page, size } = queryBlogDto;

    const [blogs, count] =
      await this.adminBlogUseCase.getAdminBlogs(queryBlogDto);

    return new ResponseDto('Blogs Fetched', blogs, {
      count,
      page,
      size,
    });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'find blog' })
  async findOne(@Param('slug') slug: string) {
    return new ResponseDto(
      'Blog Fetched',
      await this.adminBlogUseCase.getAdminBlogBySlug(slug),
    );
  }
}
