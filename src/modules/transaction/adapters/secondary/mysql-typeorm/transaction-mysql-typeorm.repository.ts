import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MySQLTypeORMTransactionEntity } from './transaction-mysql-typeorm.entity';
import { TransactionRepositoryPort } from 'src/modules/transaction/ports/out/transaction-repository.port';
import { Transaction } from 'src/modules/transaction/domain/transaction.domain';

@Injectable()
export class MySQLTypeORMTransactionRepository extends TransactionRepositoryPort {
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
