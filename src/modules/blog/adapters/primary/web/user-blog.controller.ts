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
import { UserBlogUseCase } from 'src/modules/blog/ports/in/user-blog-usecase.port';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { QueryBlogDto } from 'src/modules/blog/application/dto/query-blog.dto';
import { User as UserDomain } from 'src/modules/user/domain/user.domain';
import { User } from 'src/modules/user/infrastructure/decorators/user.decorator';
import { CreateBlogDto } from 'src/modules/blog/application/dto/create-blog.dto';
import { Blog } from 'src/modules/blog/domain/blog.domain';
import { UpdateBlogDto } from 'src/modules/blog/application/dto/update-blog.dto';

@ApiBearerAuth()
@ApiTags('user/blog')
@Controller('user/blog')
export class UserBlogController {
  constructor(private readonly userBlogUseCase: UserBlogUseCase) {}

  @Get()
  @ApiOperation({ summary: 'find all blogs' })
  async findAll(
    @Query(new ValidationPipe({ transform: true }))
    queryBlogDto: QueryBlogDto,
    @User() user: UserDomain,
  ) {
    const { page, size } = queryBlogDto;

    const [blogs, count] = await this.userBlogUseCase.getUserBlogs(
      user,
      queryBlogDto,
    );

    return new ResponseDto('Blogs Fetched', blogs, {
      count,
      page,
      size,
    });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'find blog' })
  async findOne(@Param('slug') slug: string, @User() user: UserDomain) {
    return new ResponseDto(
      'Blog Fetched',
      await this.userBlogUseCase.getUserBlogBySlug(slug, user),
    );
  }

  @Post()
  @ApiOperation({ summary: 'create blog' })
  async create(@Body() createBlogDto: CreateBlogDto, @User() user: UserDomain) {
    await this.userBlogUseCase.createUserBlog(
      Blog.create({ ...createBlogDto, userId: user.id }),
    );

    return new ResponseDto('Blog Created');
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'update blog' })
  async update(
    @Param('slug') slug: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @User() user: UserDomain,
  ) {
    await this.userBlogUseCase.updateUserBlogBySlug(
      { user: user, slug },
      Blog.update(updateBlogDto),
    );

    return new ResponseDto('Blog Updated');
  }
}
