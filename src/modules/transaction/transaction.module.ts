import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TransactionEntity } from './adapters/out/mysql-typeorm/entities/transaction.entity';
import { TransactionEntity } from './adapters/out/mysql-sequelize/entities/transaction.entity';
import { TransactionController } from './adapters/in/web/transaction.controller';
// import { TransactionRepository } from './adapters/out/mysql-typeorm/repositories/transaction.repository';
import { TransactionRepository } from './adapters/out/mysql-sequelize/repositories/transaction.repository';
import { OnlinePaymentModule } from '../online-payment/online-payment.module';
import { CreateTransactionUseCase } from './application/usecases/create-transaction.usecase';
import { GetTransactionUseCase } from './application/usecases/get-transaction.usecase';
import { UpdateTransactionUseCase } from './application/usecases/update-transaction.usecase';
import { KhaltiTransactionUseCase } from './application/usecases/khalti-transaction.usecase';
import { EsewaTransactionUseCase } from './application/usecases/esewa-transaction.usecase';
import { TransactionRepositoryPort } from './ports/out/transaction-repository.port';

@Module({
  imports: [
    // TypeOrmModule.forFeature([TransactionEntity]),
    SequelizeModule.forFeature([TransactionEntity]),
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
      useClass: TransactionRepository,
    },
  ],
  exports: [TransactionRepositoryPort],
})
export class TransactionModule {}
