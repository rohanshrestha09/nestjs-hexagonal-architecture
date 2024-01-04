import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './adapters/primary/web/transaction.controller';
import { OnlinePaymentModule } from '../online-payment/online-payment.module';
import { TransactionRepository } from './ports/out/transaction-repository.port';
import { MySQLTypeORMTransactionEntity } from './adapters/secondary/mysql-typeorm/transaction-mysql-typeorm.entity';
import { TransactionUseCase } from './ports/in/transaction-usecase.port';
import { TransactionUseCaseImpl } from './application/usecases/transaction.usecase';
import { MySQLTypeORMTransactionRepositoryImpl } from './adapters/secondary/mysql-typeorm/transaction-mysql-typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MySQLTypeORMTransactionEntity]),
    OnlinePaymentModule,
  ],
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionUseCase,
      useClass: TransactionUseCaseImpl,
    },
    {
      provide: TransactionRepository,
      useClass: MySQLTypeORMTransactionRepositoryImpl,
    },
  ],
  exports: [TransactionRepository, TransactionUseCase],
})
export class TransactionModule {}
