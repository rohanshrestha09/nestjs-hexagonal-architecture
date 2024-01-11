import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBlogUseCaseImpl } from 'src/core/application/usecases/blog/admin-blog.usecase';
import { BlogUseCaseImpl } from 'src/core/application/usecases/blog/blog.usecase';
import { UserBlogUseCaseImpl } from 'src/core/application/usecases/blog/user-blog.usecase';
import { AdminBlogUseCase } from 'src/core/ports/in/blog/admin-blog-usecase.port';
import { BlogUseCase } from 'src/core/ports/in/blog/blog-usecase.port';
import { UserBlogUseCase } from 'src/core/ports/in/blog/user-blog-usecase.port';
import { BlogRepository } from 'src/core/ports/out/blog/blog-repository.port';
import { AdminBlogController } from 'src/frameworks/primary/controllers/blog/admin-blog.controller';
import { UserBlogController } from 'src/frameworks/primary/controllers/blog/user-blog.controller';
import { MySQLTypeORMBlogEntity } from 'src/frameworks/secondary/mysql-typeorm/blog/blog-mysql-typeorm.entity';
import { MySQLTypeORMBlogRepositoryImpl } from 'src/frameworks/secondary/mysql-typeorm/blog/blog-mysql-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMBlogEntity])],
  controllers: [AdminBlogController, UserBlogController],
  providers: [
    {
      provide: BlogUseCase,
      useClass: BlogUseCaseImpl,
    },
    {
      provide: AdminBlogUseCase,
      useClass: AdminBlogUseCaseImpl,
    },
    {
      provide: UserBlogUseCase,
      useClass: UserBlogUseCaseImpl,
    },
    {
      provide: BlogRepository,
      useClass: MySQLTypeORMBlogRepositoryImpl,
    },
  ],
  exports: [BlogUseCase, AdminBlogUseCase, UserBlogUseCase],
})
export class BlogModule {}
