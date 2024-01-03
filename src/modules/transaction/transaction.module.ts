import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './adapters/primary/web/transaction.controller';
import { OnlinePaymentModule } from '../online-payment/online-payment.module';
import { CreateTransactionUseCase } from './application/usecases/create-transaction.usecase';
import { GetTransactionUseCase } from './application/usecases/get-transaction.usecase';
import { UpdateTransactionUseCase } from './application/usecases/update-transaction.usecase';
import { KhaltiTransactionUseCase } from './application/usecases/khalti-transaction.usecase';
import { EsewaTransactionUseCase } from './application/usecases/esewa-transaction.usecase';
import { TransactionRepositoryPort } from './ports/out/transaction-repository.port';
import { MySQLTypeORMTransactionEntity } from './adapters/secondary/mysql-typeorm/transaction-mysql-typeorm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MySQLTypeORMTransactionEntity]),
    OnlinePaymentModule,
  ],
  controllers: [TransactionController],
  providers: [
    CreateTransactionUseCase,
    GetTransactionUseCase,
    UpdateTransactionUseCase,
    KhaltiTransactionUseCase,
    EsewaTransactionUseCase,
    {
      provide: TransactionRepositoryPort,
      useClass: MySQLTypeORMTransactionEntity,
    },
  ],
  exports: [TransactionRepositoryPort],
})
export class TransactionModule {}
