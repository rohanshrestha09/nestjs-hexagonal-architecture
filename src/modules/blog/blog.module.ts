import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLTypeORMBlogEntity } from './adapters/secondary/mysql-typeorm/blog-mysql-typeorm.entity';
import { AdminBlogController } from './adapters/primary/web/admin-blog.controller';
import { UserBlogController } from './adapters/primary/web/user-blog.controller';
import { BlogRepository } from './ports/out/blog-repository.port';
import { MySQLTypeORMBlogRepositoryImpl } from './adapters/secondary/mysql-typeorm/blog-mysql-typeorm.repository';
import { AdminBlogUseCase } from './ports/in/admin-blog-usecase.port';
import { AdminBlogUseCaseImpl } from './application/usecases/admin-blog.usecase';
import { UserBlogUseCase } from './ports/in/user-blog-usecase.port';
import { UserBlogUseCaseImpl } from './application/usecases/user-blog-usecase';
import { BlogUseCase } from './ports/in/blog-usecase.port';
import { BlogUseCaseImpl } from './application/usecases/blog.usecase';

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
