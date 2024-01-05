import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLTypeORMBookEntity } from './adapters/secondary/mysql-typeorm/book-mysql-typeorm.entity';
import { AdminBookController } from './adapters/primary/web/admin-book.controller';
import { AdminBookUseCase } from './ports/in/admin-book-usecase.port';
import { AdminBookUseCaseImpl } from './application/usecases/admin-book.usecase';
import { BookRepository } from './ports/out/book-repository.port';
import { MySQLTypeORMBookRepositoryImpl } from './adapters/secondary/mysql-typeorm/book-mysql-typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MySQLTypeORMBookEntity])],
  controllers: [AdminBookController],
  providers: [
    {
      provide: AdminBookUseCase,
      useClass: AdminBookUseCaseImpl,
    },
    {
      provide: BookRepository,
      useClass: MySQLTypeORMBookRepositoryImpl,
    },
  ],
  exports: [AdminBookUseCase],
})
export class BookModule {}
