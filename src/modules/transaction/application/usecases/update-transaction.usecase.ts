import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionRepositoryPort } from '../../ports/out/transaction-repository.port';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(private transactionRepositoryPort: TransactionRepositoryPort) {}

  async updateTransaction(
    transactionId: number,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.transactionRepositoryPort.updateTransaction(
      transactionId,
      updateTransactionDto,
    );
  }
}
