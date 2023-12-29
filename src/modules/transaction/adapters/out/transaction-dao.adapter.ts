import { Injectable } from '@nestjs/common';
import { TransactionDAO } from 'src/modules/transaction/application/dao/transaction.dao';
import { TransactionRepository } from './mysql-typeorm/repositories/transaction.repository';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../application/dto/update-transaction.dto';
import { TransactionMapper } from '../../infrastructure/mapper/transaction.mapper';

@Injectable()
export class TransactionDAOAdapter implements TransactionDAO {
  constructor(private transactionRepository: TransactionRepository) {}

  async findTransactionById(transactionId: number) {
    const transaction = await this.transactionRepository.findOneOrThrow({
      where: {
        id: transactionId,
      },
    });

    return TransactionMapper.toDomain(transaction);
  }

  async findUserTransactionById({
    userId,
    transactionId,
  }: {
    userId: string;
    transactionId: number;
  }) {
    const transaction = await this.transactionRepository.findOneOrThrow({
      where: {
        id: transactionId,
        user: { id: userId },
      },
    });

    return TransactionMapper.toDomain(transaction);
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionRepository.create({
      ...createTransactionDto,
      user: { id: createTransactionDto.userId },
    });

    return TransactionMapper.toDomain(transaction);
  }

  async updateTransaction(
    transactionId: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.transactionRepository.update(
      { id: transactionId },
      updateTransactionDto,
    );
  }
}
