import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBookUseCaseImpl } from 'src/core/application/usecases/book/admin-book.usecase';
import { BookUseCaseImpl } from 'src/core/application/usecases/book/book.usecase';
import { UserBookUseCaseImpl } from 'src/core/application/usecases/book/user-book.usecase';
import { AdminBookUseCase } from 'src/core/ports/in/book/admin-book-usecase.port';
import { BookUseCase } from 'src/core/ports/in/book/book-usecase.port';
import { UserBookUseCase } from 'src/core/ports/in/book/user-book-usecase.port';
import { BookRepository } from 'src/core/ports/out/book/book-repository.port';
import { AdminBookController } from 'src/frameworks/primary/controllers/book/admin-book.controller';
import { MySQLTypeORMBookEntity } from 'src/frameworks/secondary/mysql-typeorm/book/book-mysql-typeorm.entity';
import { MySQLTypeORMBookRepositoryImpl } from 'src/frameworks/secondary/mysql-typeorm/book/book-mysql-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMBookEntity])],
  controllers: [AdminBookController],
  providers: [
    {
      provide: BookUseCase,
      useClass: BookUseCaseImpl,
    },
    {
      provide: AdminBookUseCase,
      useClass: AdminBookUseCaseImpl,
    },
    {
      provide: UserBookUseCase,
      useClass: UserBookUseCaseImpl,
    },
    {
      provide: BookRepository,
      useClass: MySQLTypeORMBookRepositoryImpl,
    },
  ],
  exports: [BookUseCase, AdminBookUseCase, UserBookUseCase],
})
export class BookModule {}
