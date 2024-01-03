import { Injectable } from '@nestjs/common';
import { Transaction } from '../../domain/transaction.domain';
import { TransactionRepositoryPort } from '../../ports/out/transaction-repository.port';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(private transactionRepositoryPort: TransactionRepositoryPort) {}

  async updateTransaction(
    transactionId: number,
    transaction: Partial<Transaction>,
  ) {
    await this.transactionRepositoryPort.updateTransaction(
      transactionId,
      transaction,
    );
  }
}
