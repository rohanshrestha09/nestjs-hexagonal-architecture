import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './adapters/primary/web/transaction.controller';
import { OnlinePaymentModule } from '../online-payment/online-payment.module';
import { TransactionRepositoryPort } from './ports/out/transaction-repository.port';
import { MySQLTypeORMTransactionEntity } from './adapters/secondary/mysql-typeorm/transaction-mysql-typeorm.entity';
import { TransactionUseCasePort } from './ports/in/transaction-usecase.port';
import { TransactionUseCase } from './application/usecases/transaction.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([MySQLTypeORMTransactionEntity]),
    OnlinePaymentModule,
  ],
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionUseCasePort,
      useClass: TransactionUseCase,
    },
    {
      provide: TransactionRepositoryPort,
      useClass: MySQLTypeORMTransactionEntity,
    },
  ],
  exports: [TransactionRepositoryPort, TransactionUseCasePort],
})
export class TransactionModule {}
