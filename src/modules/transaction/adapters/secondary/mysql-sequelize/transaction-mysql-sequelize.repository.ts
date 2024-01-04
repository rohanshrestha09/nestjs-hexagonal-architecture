import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MySQLSequelizeTransactionEntity } from './transaction-mysql-sequelize.entity';
import { TransactionRepository } from 'src/modules/transaction/ports/out/transaction-repository.port';
import { Transaction } from 'src/modules/transaction/domain/transaction.domain';

@Injectable()
export class MySQLSequelizeTransactionRepositoryImpl extends TransactionRepository {
  constructor(
    @InjectModel(MySQLSequelizeTransactionEntity)
    private transactionRepository: typeof MySQLSequelizeTransactionEntity,
  ) {
    super();
  }

  async findTransactionById(transactionId: number) {
    const transaction = await this.transactionRepository.findByPk(
      transactionId,
      { rejectOnEmpty: true },
    );

    return Transaction.toDomain(transaction);
  }

  async findUserTransactionById({
    userId,
    transactionId,
  }: {
    userId: string;
    transactionId: number;
  }) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: transactionId,
        userId,
      },
      rejectOnEmpty: true,
    });

    return Transaction.toDomain(transaction);
  }

  async createTransaction(transaction: Transaction) {
    return Transaction.toDomain(
      await this.transactionRepository.create({
        ...transaction,
      }),
    );
  }

  async updateTransaction(
    transactionId: number,
    transaction: Partial<Transaction>,
  ) {
    await this.transactionRepository.update(transaction, {
      where: {
        id: transactionId,
      },
    });
  }
}
