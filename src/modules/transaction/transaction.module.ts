import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './adapters/out/mysql-typeorm/entities/transaction.entity';
import { TransactionController } from './adapters/in/web/transaction.controller';
import { TransactionRepository } from './adapters/out/mysql-typeorm/repositories/transaction.repository';
import { TransactionDAO } from './application/dao/transaction.dao';
import { TransactionDAOAdapter } from './adapters/out/transaction-dao.adapter';
import { OnlinePaymentModule } from '../online-payment/online-payment.module';
import { CreateTransactionUseCase } from './application/usecases/create-transaction.usecase';
import { GetTransactionUseCase } from './application/usecases/get-transaction.usecase';
import { UpdateTransactionUseCase } from './application/usecases/update-transaction.usecase';
import { KhaltiTransactionUseCase } from './application/usecases/khalti-transaction.usecase';
import { EsewaTransactionUseCase } from './application/usecases/esewa-transaction.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), OnlinePaymentModule],
  controllers: [TransactionController],
  providers: [
    TransactionRepository,
    CreateTransactionUseCase,
    GetTransactionUseCase,
    UpdateTransactionUseCase,
    KhaltiTransactionUseCase,
    EsewaTransactionUseCase,
    {
      provide: TransactionDAO,
      useClass: TransactionDAOAdapter,
    },
  ],
  exports: [
    CreateTransactionUseCase,
    GetTransactionUseCase,
    UpdateTransactionUseCase,
    KhaltiTransactionUseCase,
    EsewaTransactionUseCase,
  ],
})
export class TransactionModule {}
