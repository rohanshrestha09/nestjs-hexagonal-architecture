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
import { UserBlogUseCase } from 'src/core/ports/in/blog/user-blog-usecase.port';
import { QueryBlogDto } from '../../dto/blog/query-blog.dto';
import { User } from '../../decorators/user/user.decorator';
import { ResponseDto } from '../../dto/response.dto';
import { CreateBlogDto } from '../../dto/blog/create-blog.dto';
import { UpdateBlogDto } from '../../dto/blog/update-blog.dto';
import { Blog } from 'src/core/domain/blog/blog.domain';
import { User as UserDomain } from 'src/core/domain/user/user.domain';

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
