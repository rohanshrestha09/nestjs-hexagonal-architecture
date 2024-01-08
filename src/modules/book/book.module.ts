import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLTypeORMBookEntity } from './adapters/secondary/mysql-typeorm/book-mysql-typeorm.entity';
import { AdminBookController } from './adapters/primary/web/admin-book.controller';
import { AdminBookUseCase } from './ports/in/admin-book-usecase.port';
import { AdminBookUseCaseImpl } from './application/usecases/admin-book.usecase';
import { BookRepository } from './ports/out/book-repository.port';
import { MySQLTypeORMBookRepositoryImpl } from './adapters/secondary/mysql-typeorm/book-mysql-typeorm.repository';
import { UserBookUseCase } from './ports/in/user-book-usecase.port';
import { UserBookUseCaseImpl } from './application/usecases/user-book.usecase';
import { BookUseCase } from './ports/in/book-usecase.port';
import { BookUseCaseImpl } from './application/usecases/book.usecase';

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
