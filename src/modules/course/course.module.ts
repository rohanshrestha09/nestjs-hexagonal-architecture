import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLTypeORMCourseEntity } from 'src/frameworks/secondary/mysql-typeorm/course/course-mysql-typeorm.entity';
import { BlogModule } from '../blog/blog.module';
import { BookModule } from '../book/book.module';
import { AdminCourseController } from 'src/frameworks/primary/controllers/course/admin-course.controller';
import { UserCourseController } from 'src/frameworks/primary/controllers/course/user-course.controller';
import { AdminCourseUseCase } from 'src/core/ports/in/course/admin-course-usecase.port';
import { AdminCourseUseCaseImpl } from 'src/core/application/usecases/course/admin-course.usecase';
import { UserCourseUseCase } from 'src/core/ports/in/course/user-course-usecase.port';
import { UserCourseUseCaseImpl } from 'src/core/application/usecases/course/user-course.usecase';
import { CourseRepository } from 'src/core/ports/out/course/course-repository.port';
import { MySQLTypeORMCourseRepositoryImpl } from 'src/frameworks/secondary/mysql-typeorm/course/course-mysql-typeorm.repository';

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
