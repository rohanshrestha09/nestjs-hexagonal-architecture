import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../metadata';
import { AdminBlogUseCase } from 'src/core/ports/in/blog/admin-blog-usecase.port';
import { QueryBlogDto } from '../../dto/blog/query-blog.dto';
import { ResponseDto } from '../../dto/response.dto';
import { ROLE } from 'src/common/enums/role.enum';

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
