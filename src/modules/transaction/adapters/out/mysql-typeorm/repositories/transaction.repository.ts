import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionRepositoryPort } from 'src/modules/transaction/ports/out/transaction-repository.port';
import { CreateTransactionDto } from 'src/modules/transaction/application/dto/create-transaction.dto';
import { UpdateTransactionDto } from 'src/modules/transaction/application/dto/update-transaction.dto';
import { TransactionMapper } from 'src/modules/transaction/infrastructure/mapper/transaction.mapper';

@Injectable()
export class TransactionRepository extends TransactionRepositoryPort {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
  ) {
    super();
  }

  async findTransactionById(transactionId: number) {
    const transaction = await this.transactionRepository.findOneOrFail({
      where: { id: transactionId },
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
    const transaction = await this.transactionRepository.findOneOrFail({
      where: {
        id: transactionId,
        userId,
      },
    });

    return TransactionMapper.toDomain(transaction);
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionRepository.save(
      this.transactionRepository.create({ ...createTransactionDto }),
    );

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
