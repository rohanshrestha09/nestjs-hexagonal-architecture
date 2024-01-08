import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLTypeORMCourseEntity } from './adapters/secondary/mysql-typeorm/course-mysql-typeorm.entity';
import { AdminCourseController } from './adapters/primary/web/admin-course.controller';
import { AdminCourseUseCase } from './ports/in/admin-course.usecase';
import { AdminCourseUseCaseImpl } from './application/usecases/admin-course.usecase';
import { CourseRepository } from './ports/out/course-repository.port';
import { MySQLTypeORMCourseRepositoryImpl } from './adapters/secondary/mysql-typeorm/course-mysql-typeorm.repository';
import { UserCourseUseCase } from './ports/in/user-course.usecase';
import { UserCourseUseCaseImpl } from './application/usecases/user-course.usecase';
import { UserCourseController } from './adapters/primary/web/user-course.controller';
import { BookModule } from '../book/book.module';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MySQLTypeORMCourseEntity]),
    BlogModule,
    BookModule,
  ],
  controllers: [AdminCourseController, UserCourseController],
  providers: [
    {
      provide: AdminCourseUseCase,
      useClass: AdminCourseUseCaseImpl,
    },
    {
      provide: UserCourseUseCase,
      useClass: UserCourseUseCaseImpl,
    },
    {
      provide: CourseRepository,
      useClass: MySQLTypeORMCourseRepositoryImpl,
    },
  ],
  exports: [AdminCourseUseCase, UserCourseUseCase],
})
export class CourseModule {}
