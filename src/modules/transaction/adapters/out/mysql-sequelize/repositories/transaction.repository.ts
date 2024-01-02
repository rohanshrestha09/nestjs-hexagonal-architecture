import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionRepositoryPort } from 'src/modules/transaction/ports/out/transaction-repository.port';
import { TransactionMapper } from 'src/modules/transaction/infrastructure/mapper/transaction.mapper';
import { CreateTransactionDto } from 'src/modules/transaction/application/dto/create-transaction.dto';
import { UpdateTransactionDto } from 'src/modules/transaction/application/dto/update-transaction.dto';

@Injectable()
export class TransactionRepository extends TransactionRepositoryPort {
  constructor(
    @InjectModel(TransactionEntity)
    private transactionRepository: typeof TransactionEntity,
  ) {
    super();
  }

  async findTransactionById(transactionId: number) {
    const transaction = await this.transactionRepository.findByPk(
      transactionId,
      { rejectOnEmpty: true },
    );

    return TransactionMapper.toDomain(transaction);
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

    return TransactionMapper.toDomain(transaction);
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionRepository.create({
      ...createTransactionDto,
    });

    return TransactionMapper.toDomain(transaction);
  }

  async updateTransaction(
    transactionId: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.transactionRepository.update(updateTransactionDto, {
      where: {
        id: transactionId,
      },
    });
  }
}
