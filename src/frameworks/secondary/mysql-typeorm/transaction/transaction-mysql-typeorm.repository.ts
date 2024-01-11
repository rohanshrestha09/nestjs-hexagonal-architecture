import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from 'src/core/ports/out/transaction/transaction-repository.port';
import { Repository } from 'typeorm';
import { MySQLTypeORMTransactionEntity } from './transaction-mysql-sequelize.entity';
import { Transaction } from 'src/core/domain/transaction/transaction.domain';

@Injectable()
export class MySQLTypeORMTransactionRepositoryImpl extends TransactionRepository {
  constructor(
    @InjectRepository(MySQLTypeORMTransactionEntity)
    private transactionRepository: Repository<MySQLTypeORMTransactionEntity>,
  ) {
    super();
  }

  async findTransactionById(transactionId: number) {
    const transaction = await this.transactionRepository.findOneOrFail({
      where: { id: transactionId },
    });

    return Transaction.toDomain(transaction);
  }

  async findUserTransactionById({
    userId,
    transactionId,
  }: {
    userId: string;
    transactionId: number;
  }) {
    const transaction = await this.transactionRepository.findOneOrFail({
      where: {
        id: transactionId,
        userId,
      },
    });

    return Transaction.toDomain(transaction);
  }

  async createTransaction(transaction: Transaction) {
    return Transaction.toDomain(
      await this.transactionRepository.save(
        this.transactionRepository.create({ ...transaction }),
      ),
    );
  }

  async updateTransaction(
    transactionId: number,
    transaction: Partial<Transaction>,
  ) {
    await this.transactionRepository.update({ id: transactionId }, transaction);
  }
}
