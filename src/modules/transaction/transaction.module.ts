import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLTypeORMTransactionEntity } from 'src/frameworks/secondary/mysql-typeorm/transaction/transaction-mysql-sequelize.entity';
import { OnlinePaymentModule } from '../online-payment/online-payment.module';
import { TransactionController } from 'src/frameworks/primary/controllers/transaction/transaction.controller';
import { TransactionUseCase } from 'src/core/ports/in/transaction/transaction-usecase.port';
import { TransactionUseCaseImpl } from 'src/core/application/usecases/transaction/transaction.usecase';
import { TransactionRepository } from 'src/core/ports/out/transaction/transaction-repository.port';
import { MySQLTypeORMTransactionRepositoryImpl } from 'src/frameworks/secondary/mysql-typeorm/transaction/transaction-mysql-typeorm.repository';

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
